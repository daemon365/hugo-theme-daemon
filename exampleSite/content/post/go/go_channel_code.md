---
title: "Go Channel 原理"
date: 2024-12-22T00:00:00+08:00
categories: ["go"]
tags: ["go", "channel", "concurrency"]
---

Go 语言的 channel 是一种用于 goroutine 之间通信的机制。本文将深入探讨 channel 的底层实现原理。

<!--more-->

## 结构

Channel 的核心数据结构是 `hchan`：

```go
type hchan struct {
    qcount   uint           // 队列中的元素个数
    dataqsiz uint           // 环形队列的容量
    buf      unsafe.Pointer // 环形队列的指针
    elemsize uint16        // 元素的大小
    closed   uint32         // 是否关闭
    timer    *timer         // 为此通道提供时间控制的计时器
    elemtype *_type         // 元素的类型
    sendx    uint           // 发送索引
    recvx    uint           // 接收索引
    recvq    waitq          // 等待接收的队列
    sendq    waitq          // 等待发送的队列
    lock mutex              // 锁
}
```

### waitq 结构

等待队列的定义：

```go
type waitq struct {
    first *sudog // 首指针
    last  *sudog // 尾指针
}
```

### sudog 结构

等待队列中的元素：

```go
type sudog struct {
    g *g              // goroutine
    next *sudog       // 指向下一个sudog
    prev *sudog       // 指向上一个sudog
    elem unsafe.Pointer // 指向数据元素的指针
    acquiretime int64 // 获取资源的时间
    releasetime int64 // 释放资源的时间
    ticket      uint32 // 票据号码
    isSelect bool     // 是否在select中使用
    success bool      // 通信是否成功
    parent   *sudog   // 指向父节点的指针
    waitlink *sudog   // g的等待链表
    waittail *sudog   // semaRoot的尾部
    c        *hchan   // 指向sudog所等待的通道
}
```

## 发送数据

向 channel 发送数据的过程：

1. 加锁
2. 检查是否有等待接收的 goroutine
3. 如果有，直接发送数据给接收者
4. 如果没有，将数据放入缓冲区
5. 如果缓冲区已满，将当前 goroutine 加入发送等待队列
6. 解锁

```go
func chansend(c *hchan, ep unsafe.Pointer, block bool) bool {
    // 实现细节...
}
```

## 接收数据

从 channel 接收数据的过程与发送类似：

1. 加锁
2. 检查是否有等待发送的 goroutine
3. 如果有，直接接收数据
4. 如果没有，从缓冲区读取
5. 如果缓冲区为空，将当前 goroutine 加入接收等待队列
6. 解锁

## 关闭 Channel

关闭 channel 会唤醒所有等待的 goroutine：

- 等待接收的 goroutine 会收到零值
- 等待发送的 goroutine 会 panic

## 总结

Channel 是 Go 语言并发编程的核心，理解其底层实现有助于写出更高效的并发代码。

关键点：
- 使用环形队列实现缓冲
- 使用等待队列管理阻塞的 goroutine
- 通过锁保证并发安全
- 发送和接收操作可能导致 goroutine 阻塞和唤醒

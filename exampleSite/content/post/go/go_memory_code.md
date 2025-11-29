---
title: "go 内存管理"
date: 2024-12-10T00:00:00+08:00
categories: ["go"]
tags: ["go", "memory", "gc"]
---

Go 语言的内存管理采用了自动垃圾回收机制，同时提供了高效的内存分配器。本文深入探讨 Go 的内存管理原理。

<!--more-->

## 内存分配器

Go 的内存分配器基于 TCMalloc 设计，采用多级缓存策略。

### 内存结构

```
+------------------+
|     Heap         |
+------------------+
|     mheap        |  全局堆
+------------------+
|     mcentral     |  中心缓存
+------------------+
|     mcache       |  线程缓存（每个 P 一个）
+------------------+
|     mspan        |  内存块
+------------------+
```

### 对象大小分类

Go 将对象分为三类：

1. **Tiny 对象**（< 16B）：多个 tiny 对象可能共享一个 span
2. **Small 对象**（16B - 32KB）：分配在固定大小的 span 中
3. **Large 对象**（> 32KB）：直接从 mheap 分配

## 内存分配流程

### 小对象分配

```go
func mallocgc(size uintptr, typ *_type, needzero bool) unsafe.Pointer {
    // 1. 从 mcache 尝试分配
    // 2. mcache 不足时从 mcentral 获取
    // 3. mcentral 不足时从 mheap 获取
    // 4. mheap 不足时向操作系统申请
}
```

分配步骤：

1. 计算对象大小类别
2. 从当前 P 的 mcache 查找对应的 mspan
3. 在 mspan 中分配对象
4. 如果 mspan 已满，从 mcentral 获取新的 mspan
5. 如果 mcentral 为空，从 mheap 分配新的 mspan

### 大对象分配

直接从 mheap 分配：

```go
// 大对象直接分配
span := mheap.alloc(npages)
```

## mspan 结构

```go
type mspan struct {
    next *mspan     // 链表指针
    prev *mspan
    
    startAddr uintptr   // 起始地址
    npages    uintptr   // 页数
    
    manualFreeList gclinkptr  // 空闲对象链表
    
    allocCount  uint16  // 已分配对象数
    spanclass   spanClass  // size class 和 noscan 标志
    
    state       mSpanStateBox  // 状态
    needzero    uint8   // 是否需要清零
}
```

## 内存回收

### 对象回收

垃圾回收器标记后：

1. 将未使用的对象加入空闲链表
2. 如果整个 mspan 都是空闲的，归还给 mcentral
3. mcentral 中过多空闲 mspan 时，归还给 mheap
4. mheap 可能将内存归还给操作系统

### 内存归还

Go 1.12+ 引入 scavenger，定期将空闲内存归还给操作系统：

```go
// 每隔一段时间运行
func scavenge(target uintptr) {
    // 释放不再使用的物理内存
}
```

## 优化建议

### 1. 对象池复用

```go
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

// 使用
buf := bufPool.Get().(*bytes.Buffer)
defer bufPool.Put(buf)
```

### 2. 预分配切片

```go
// 好的做法
slice := make([]int, 0, expectedSize)

// 避免
slice := make([]int, 0)
```

### 3. 避免内存泄漏

```go
// 清理切片引用
slice = slice[:0]

// 注意 goroutine 泄漏
// 注意全局 map 持有引用
```

## 性能分析

### 查看内存分配

```go
import _ "net/http/pprof"

// 访问 /debug/pprof/heap
```

### 使用 benchmark

```go
func BenchmarkAlloc(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        _ = make([]byte, 1024)
    }
}
```

## 总结

Go 的内存管理设计精巧：

- 多级缓存减少锁竞争
- 大小分类提高分配效率
- 自动垃圾回收简化编程
- 提供工具进行性能分析

理解内存管理有助于写出更高效的 Go 程序。

## 参考资料

- [Go 内存分配器可视化](https://www.youtube.com/watch?v=ZMZpH4yT7M0)
- [TCMalloc 论文](https://google.github.io/tcmalloc/)
- [Go 源码](https://github.com/golang/go/tree/master/src/runtime)

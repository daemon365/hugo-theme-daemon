---
title: kube-apiserver 高可用，keepalived + haproxy
date: 2024-11-02 17:42:54+08:00
lastmod: 2024-11-02 17:42:54+08:00
categories:
- cloud
tags:
- keepalived
- haproxy
- kubernetes
showToc: true
---


## 为什么要做高可用

在生产环境中，kubernetes 集群中会多多个 master 节点，每个 master 节点上都会部署 kube-apiserver 服务，实现高可用。但是 client 访问 kube-apiserver 时，需要指定 ip 或者域名，这样会出现单点故障。官方推荐的做法是使用一个负载均衡器，将多个 kube-apiserver 服务负载均衡，实现高可用，但很多时候我们是没有这个条件的。这时候就得想想办法了，比如 nignx 转发，但是 nginx 也是单点。域名的方式，但是这种方式生效时间较长，不太适合紧急情况。所以这里介绍一种使用 keepalived + haproxy 的方式实现 kube-apiserver 的高可用。这是一共公用 IP 的方式，当主节点宕机时，VIP 会自动切换到备节点，实现高可用。

<!--more-->

## 环境准备

- master1: 192.168.31.203
- master2: 192.168.31.34
- master3: 192.168.31.46
- worker1: 192.168.31.25
- VIP （虚拟IP）:  192.168.31.230 

## 安装

```bash
sudo apt install keepalived haproxy

systemctl enable haproxy
systemctl restart haproxy

systemctl enable keepalived
# 没有配置会出现错误 不用管
systemctl restart keepalived
```

## 配置 keepalived

### 配置文件

编辑 keepalived 配置文件

编辑 /etc/keepalived/keepalived.conf

master1：

```conf
# 健康检查 查看 haproxy 的进程在不在
vrrp_script chk_haproxy {
  script "killall -0 haproxy"
  interval 2 # 多少秒教程一次
  weight 3 # 成功了优先级加多少
}

vrrp_instance h
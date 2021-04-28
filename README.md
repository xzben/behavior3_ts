# behavior3_ts

behavior3 typescript 版本

version: 0.2.2

翻译自 https://github.com/behavior3/behavior3js

behavior3 简单介绍说明

1、Action 具体的一个行为动作，就是我们最终行为树要做什么。是叶子节点
2、Condition  做一个判断条件，返回成功与失败  也是叶子节点，可以结合 Composite 实现 action 执行的前缀条件 
3、Composite  一个组合节点，用于 模拟逻辑思维中的 多个条件 的结合判断，
4、Decorator 装饰器，用于给自节点增加修饰功能，比如 循环控制，逻辑非，超时控制等

6、运行过程中有四种状态
  SUCCESS   // 成功
  FAILURE   // 失败
  RUNNING   // 挂起
  ERROR     // 异常

7、Blackboard 其实就是一个公共的数据存储中心，主要是为了将 每个节点中的状态剥离出来。这样节点就是状态无关的一个东西。比较纯粹
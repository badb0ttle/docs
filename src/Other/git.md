---
title: Git
icon: gears
cover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2f_3NlBhNCWlBjiauFM3e1-tyvYJKho47Zg&s
order: 4
editLink: false
category:
  - 使用指南
tag:
  - 知识点


---
#
## git基础
我很推荐在游玩中学习关于git的知识:[git小游戏](https://learngitbranching.js.org/?locale=zh_CN)
所以接下来的是一些git的指令，旨在忘记的时候方便查询(当然，熟能生巧)
## git指令(基础命令)
1. **git commit**   创建一个新的提交记录
2. **git branch** name 创建一个分支  **git checkout** name切换到某一个分支(或指针)   **git checkout -b** name 创建并切换到某一个分支  **git branch -f name place**  在某个节点创建分支  **git checkout -b name place**在某个节点创建分支并转移到该节点
3. **git merge** name 把某一个分支合并到当前指针的内容并产生一个新的分支
4. **git rebase** name 把当前指针的内容合并到某一个分支并创建一个新的分支,原分支还在，此方法更加线性
5. `^`,回到其所指的parent,如:`HEAD^`,`HEAD^^`,`C1^` 。`~`,回到第n个parent,如:`HEAD~4 ` `-f`强制移动，可以往后移动   **git branch -f a b**强制把a移动到b
6. **git reset** name撤销到某一个分支 **git revert** name撤销到某一个分支并产生一个新的分支
7. **git cherry-pick name**将某一个分支的复制提交在当前指针下   git cherry-pick a b c ...将某一个从a到b到分支的复制提交到当前指针下
8. **git rebase -i name** 打开一个交互式界面，对指定节点的子节点进行操作 **undo**,**reset**来修正错误   **git rebase a b** 把b节点合并到a
9. **git describe name**  查找某一个节点最近的tag
## git指令(远程)
1. **git clone** 创建一个远程仓库   name/main  :仓库名称/分支名称
2. **git fetch** 获取远程仓库的数据(不会占用你的磁盘空间);在你运行之后name/main会移动到远程仓库的main处
3. **git pull** 等同于fetch + merge，即先获取你的远端仓库数据再合并到你的本地仓库  --rebase等同于pull +rebase,rebase是线性的!
4. **git push** 将本地仓库上传到远程仓库，在你运行之后远程仓库的main会移动到本地仓库的o/main处
5. **git checkout -b name o/main**你把一个从未见过的name分支作为远程跟踪o/main,此时main就变成普通的分支被抛弃了QAQ
   **git branch -u o/main name**同上，如果你当前在name上还可以省略name
6. **git push origin main**  :切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。
7. **git push origin** **source:destination**这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 foo 或者 HEAD~1）
8. **git fetch origin** **source:destination**这里有一点是需要注意的 —— source 现在指的是远程仓库中的位置，而 **destination** 才是要放置提交的本地仓库的位置。它与 git push 刚好相反，这是可以讲的通的，因为我们在往相反的方向传送数据。
9. 当**source**为空时push会删除destination的分支，而相反fetch会新增分支!
10. **git pull**也就当成是fetch，就是多了个merge而已:D


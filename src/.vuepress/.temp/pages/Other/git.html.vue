<template><div><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1>
<h2 id="git基础" tabindex="-1"><a class="header-anchor" href="#git基础"><span>git基础</span></a></h2>
<p>我很推荐在游玩中学习关于git的知识:<a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank" rel="noopener noreferrer">git小游戏</a>
所以接下来的是一些git的指令，旨在忘记的时候方便查询(当然，熟能生巧)</p>
<h2 id="git指令-基础命令" tabindex="-1"><a class="header-anchor" href="#git指令-基础命令"><span>git指令(基础命令)</span></a></h2>
<ol>
<li><strong>git commit</strong>   创建一个新的提交记录</li>
<li><strong>git branch</strong> name 创建一个分支  <strong>git checkout</strong> name切换到某一个分支(或指针)   <strong>git checkout -b</strong> name 创建并切换到某一个分支  <strong>git branch -f name place</strong>  在某个节点创建分支  <strong>git checkout -b name place</strong>在某个节点创建分支并转移到该节点</li>
<li><strong>git merge</strong> name 把某一个分支合并到当前指针的内容并产生一个新的分支</li>
<li><strong>git rebase</strong> name 把当前指针的内容合并到某一个分支并创建一个新的分支,原分支还在，此方法更加线性</li>
<li><code v-pre>^</code>,回到其所指的parent,如:<code v-pre>HEAD^</code>,<code v-pre>HEAD^^</code>,<code v-pre>C1^</code> 。<code v-pre>~</code>,回到第n个parent,如:<code v-pre>HEAD~4 </code> <code v-pre>-f</code>强制移动，可以往后移动   <strong>git branch -f a b</strong>强制把a移动到b</li>
<li><strong>git reset</strong> name撤销到某一个分支 <strong>git revert</strong> name撤销到某一个分支并产生一个新的分支</li>
<li><strong>git cherry-pick name</strong>将某一个分支的复制提交在当前指针下   git cherry-pick a b c ...将某一个从a到b到分支的复制提交到当前指针下</li>
<li><strong>git rebase -i name</strong> 打开一个交互式界面，对指定节点的子节点进行操作 <strong>undo</strong>,<strong>reset</strong>来修正错误   <strong>git rebase a b</strong> 把b节点合并到a</li>
<li><strong>git describe name</strong>  查找某一个节点最近的tag</li>
</ol>
<h2 id="git指令-远程" tabindex="-1"><a class="header-anchor" href="#git指令-远程"><span>git指令(远程)</span></a></h2>
<ol>
<li><strong>git clone</strong> 创建一个远程仓库   name/main  :仓库名称/分支名称</li>
<li><strong>git fetch</strong> 获取远程仓库的数据(不会占用你的磁盘空间);在你运行之后name/main会移动到远程仓库的main处</li>
<li><strong>git pull</strong> 等同于fetch + merge，即先获取你的远端仓库数据再合并到你的本地仓库  --rebase等同于pull +rebase,rebase是线性的!</li>
<li><strong>git push</strong> 将本地仓库上传到远程仓库，在你运行之后远程仓库的main会移动到本地仓库的o/main处</li>
<li><strong>git checkout -b name o/main</strong>你把一个从未见过的name分支作为远程跟踪o/main,此时main就变成普通的分支被抛弃了QAQ
<strong>git branch -u o/main name</strong>同上，如果你当前在name上还可以省略name</li>
<li><strong>git push origin main</strong>  :切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。</li>
<li><strong>git push origin</strong> <strong>source:destination</strong>这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 foo 或者 HEAD~1）</li>
<li><strong>git fetch origin</strong> <strong>source:destination</strong>这里有一点是需要注意的 —— source 现在指的是远程仓库中的位置，而 <strong>destination</strong> 才是要放置提交的本地仓库的位置。它与 git push 刚好相反，这是可以讲的通的，因为我们在往相反的方向传送数据。</li>
<li>当<strong>source</strong>为空时push会删除destination的分支，而相反fetch会新增分支!</li>
<li><strong>git pull</strong>也就当成是fetch，就是多了个merge而已:D</li>
</ol>
</div></template>



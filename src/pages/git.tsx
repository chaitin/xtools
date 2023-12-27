import MainContent from '@/components/MainContent';
import { Box, Stack } from '@mui/material';
import Table from 'rc-table';

const _C = () => {
  const gitCodes = [
    {
      label: '创建命令 Create',
      value: [
        {
          label: 'git clone <url>',
          value: '克隆远程仓库',
        },
        {
          label: 'git init',
          value: '初始化本地 git 仓库（即创建新的本地仓库）',
        },
      ],
    },
    {
      label: '本地更改 Local Changes',
      value: [
        {
          label: 'git status',
          value: '查看当前分支状态',
        },
        {
          label: 'git diff',
          value: '查看已跟踪文件的变更',
        },
        {
          label: 'git add <file>',
          value: '将指定的文件添加到暂存区',
        },
        {
          label: 'git add .',
          value: '将所有有变更的文件添加到暂存区',
        },
        {
          label: 'git commit -a',
          value: '提交所有本地修改',
        },
        {
          label: 'git commit -m "xxx"',
          value: '把已添加至暂存区的文件执行提交，并以 xxx 作为本次提交的描述',
        },
        {
          label: 'git commit --amend -m "xxx"',
          value: '修改上一次提交（请勿用该命令修改已发布的提交）',
        },
        {
          label: 'git commit -am "xxx"',
          value: '该命令是 git add . 和 git commit -m "xxx" 的快捷方式',
        },
        {
          label: 'git stash',
          value: '暂存当前修改，将所有置为 HEAD 状态',
        },
        {
          label: 'git stash list',
          value: '查看所有暂存列表',
        },
        {
          label: 'git stash push',
          value: '把当前工作区的文件暂存到临时空间',
        },
        {
          label: 'git stash pop',
          value: '把文件从临时空间中恢复到当前工作区',
        },
      ],
    },
    {
      label: '提交历史 Commit History',
      value: [
        {
          label: 'git log',
          value: '查看提交日志',
        },
        {
          label: 'git log -n',
          value: '显示 n 行日志，n 为整数',
        },
        {
          label: 'git log --stat',
          value: '查看本地提交日志',
        },
        {
          label: 'git show <commit>',
          value: '查看提交日志及相关变动文件',
        },
        {
          label: 'git show HEAD',
          value: '查看 HEAD 提交日志',
        },
        {
          label: 'git show HEAD^',
          value:
            '查看 HEAD 的上一个版本提交日志。另外，git show HEAD^^ 是查看上 2 个版本的提交日志；git show HEAD^5 是查看上 5 个版本的提交日志',
        },
        {
          label: 'git blame <file>',
          value:
            '对于指定文件，逐行显示提交的哈希ID、提交者、提交日期以及修改的内容',
        },
        {
          label: 'git whatchanged',
          value: '显示提交历史，以及每次提交变更的文件',
        },
      ],
    },
    {
      label: '分支和标签 Branches & Tags',
      value: [
        {
          label: 'git branch',
          value: '查看本地分支',
        },
        {
          label: 'git branch -r',
          value: '查看远程分支',
        },
        {
          label: 'git branch -a',
          value: '查看所有分支（本地和远程）',
        },
        {
          label: 'git branch --merged',
          value: '查看所有分支已合并到当前分支的分支',
        },
        {
          label: 'git branch --no-merged',
          value: '查看所有分支未合并到当前分支的分支',
        },
        {
          label: 'git branch -m <new-branch>',
          value:
            '把当前分支的名称改成 new-branch；如果 new-branch 已存在，将不会执行改名',
        },
        {
          label: 'git branch -M <new-branch>',
          value:
            '强制把当前分支的名称改成 new-branch（即使 new-branch 已存在）',
        },
        {
          label: 'git branch -m <old-branch> <new-branch>',
          value:
            '把分支 old-branch 的名称改成 new-branch，如果 new-branch 已存在，将不会执行改名',
        },
        {
          label: 'git branch -M <old-branch> <new-branch>',
          value:
            '强制把分支 old-branch 的名称改成 new-branch（即使 new-branch 已存在）',
        },
        {
          label: 'git checkout <branch-name>',
          value: '切换到 branch-name 分支',
        },
        {
          label: 'git branch <new-branch>',
          value: '新建分支（也可以用 git checkout -b <new-branch>）',
        },
        {
          label: 'git branch --track <new> <remote>',
          value:
            '基于远程分支创建一个新分支，同 git checkout --track <remote/branch>',
        },
        {
          label: 'git branch -d <branch-name>',
          value: '删除本地分支',
        },
        {
          label: 'git tag',
          value: '列出所有本地标签',
        },
        {
          label: 'git tag <tag-name>',
          value: '基于最新的提交创建标签',
        },
        {
          label: 'git tag -d <tag-name>',
          value: '删除标签',
        },
      ],
    },
    {
      label: '删除命令 Remove',
      value: [
        {
          label: 'git rm <file>',
          value: '删除文件（将从磁盘中删除文件）',
        },
        {
          label: 'git rm -r <directory>',
          value: '递归删除指定目录下的文件',
        },
        {
          label: 'git rm --cached <file>',
          value: '停止跟踪文件，不会从磁盘中删除',
        },
      ],
    },
    {
      label: '合并和衍合 Merge & Rebase',
      value: [
        {
          label: 'git merge <branch>',
          value: '合并指定分支到当前分支，保留两个',
        },
        {
          label: 'git rebase <branch>',
          value: '合并指定分支到当前分支，只保留一个',
        },
        {
          label: 'git rebase --abort',
          value: '终止 rebase 操作，即回到执行 rebase 之前的状态',
        },
        {
          label: 'git rebase --continue',
          value: '解决冲突后继续执行 rebase',
        },
        {
          label: 'git mergetool',
          value: '使用配置文件指定的 mergetool 解决冲突',
        },
        {
          label: 'git add <resolved-file>\ngit rm <resolved-file>\n',
          value:
            '使用编辑器手动解决文件冲突，并在冲突解决后，把文件标记为 resolved',
        },
      ],
    },
    {
      label: '撤销命令 Undo',
      value: [
        {
          label: 'git reset --hard HEAD',
          value: '将当前版本重置为 HEAD（用于 merge 失败的时候）',
        },
        {
          label: 'git reset <commit>',
          value: '将当前版本重置为某一个提交状态，代码不变',
        },
        {
          label: 'git reset --hard <commit>',
          value:
            '强制将当前版本重置为某一个提交状态，并丢弃那个状态之后的所有修改（请谨慎使用该命令）',
        },
        {
          label: 'git reset --merge <commit>',
          value: '将当前版本重置为某一个提交状态，并保留版本库中不同的文件',
        },
        {
          label: 'git reset --keep <commit>',
          value: '将当前版本重置为某一个提交状态，并保留未提交的本地修改',
        },
        {
          label: 'git revert <commit>',
          value: '撤销提交',
        },
        {
          label: 'git restore <file>',
          value: '丢弃指定文件的修改信息，即恢复到文件修改前的状态',
        },
        {
          label: 'git checkout -- <file>',
          value: '同 git restore <file> 命令',
        },
        {
          label: 'git checkout HEAD <file>',
          value: '对于指定文件，丢弃该文件的本地修改信息',
        },
        {
          label: 'git clean',
          value: '清除工作目录中未跟踪的文件',
        },
      ],
    },
    {
      label: '配置命令 Git Configuration',
      value: [
        {
          label: 'git clean -n',
          value: '列出哪些文件将从工作目录中删除',
        },
        {
          label: 'git config --list',
          value: '列出当前 Git 配置',
        },
        {
          label: 'git config --global user.name <name>',
          value:
            '把参数 name 设置为当前用户使用的提交者的姓名；如果未指定 name 参数，则显示当前用户使用的提交者姓名',
        },
        {
          label: 'git config --global user.email <email>',
          value:
            '把参数 email 设置为当前用户使用的提交者的邮箱；如果未指定 email 参数，则显示当前用户使用的提交者邮箱',
        },
        {
          label: 'git config --global alias.<alias> <command>',
          value:
            '为 Git 命令创建全局的别名。比如，执行 alias.glog log --graph --oneline --decorate 命令后，git glog 就相当于 git log --graph --oneline --decorate。',
        },
        {
          label: 'git config --system core.editor <editor>',
          value: '对于本机的所有用户，设置命令使用的编辑器（比如 vim）',
        },
        {
          label: 'git config --global --edit',
          value: '在编辑器中打开全局配置文件（用于手动修改）',
        },
        {
          label: 'git config --global color.ui auto',
          value: '使用不同的颜色渲染 Git 命令的输出结果',
        },
      ],
    },
    {
      label: '其他命令 Other',
      value: [
        {
          label: 'git var -l',
          value: '列出 Git 环境变量',
        },
        {
          label: 'git help <command>',
          value: '显示指定命令的帮助（将呼出该命令的 man 文件）',
        },
      ],
    },
  ];
  const columns = [
    {
      title: 'Git 指令',
      dataIndex: 'label',
      width: 300,
      render(value: string) {
        return <Box sx={{ whiteSpace: 'pre-line' }}>{value}</Box>;
      },
    },
    {
      title: '命令说明',
      dataIndex: 'value',
    },
  ];

  return (
    <MainContent>
      <Box
        sx={{
          pb: 2,
          '.rc-table': {
            border: '1px solid #eee',
            borderRadius: '4px',
          },
          '.rc-table table': {
            width: '100%',
            borderCollapse: 'collapse',
          },
          '.rc-table-thead .rc-table-cell': {
            textAlign: 'left',
            paddingLeft: '24px',
            backgroundColor: '#eee',
            fontSize: '12px',
            height: '28px',
            fontWeight: 500,
            fontFamily: 'Mono',
          },
          '.rc-table-tbody .rc-table-row': {
            borderBottom: '1px solid #eee',
          },
          '.rc-table-tbody .rc-table-cell': {
            paddingLeft: '24px',
            fontSize: '14px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontFamily: 'Mono',
          },
        }}
      >
        {gitCodes.map((it) => (
          <Box key={it.label}>
            <Box sx={{ my: 2, fontWeight: 500 }}>{it.label}</Box>
            <Table columns={columns} data={it.value} rowKey='label' />
          </Box>
        ))}
        <Box sx={{ my: 2, fontWeight: 500 }}>相关术语</Box>
        <Box sx={{ my: 2, fontSize: '14px' }}>
          下面列出了 Git 常见的术语，通过这些术语，可以更好地了解 Git
          版本控制系统。
        </Box>
        <Stack sx={{ fontSize: '14px', ml: 3 }} component='ul'>
          <Box component='li'>git：一个开源的、分布式的版本控制系统</Box>
          <Box component='li'>
            commit：提交，指一个 Git 对象，该对象是整个仓库以 SHA 表示的快照
          </Box>
          <Box component='li'>
            branch：分支，一个轻量的、可移动的指向一个 commit 的指针
          </Box>
          <Box component='li'>clone：克隆，指在本地创建一份远程仓库的副本</Box>
          <Box component='li'>
            remote：远程仓库，是指托管在 GitHub、GitLab
            等地方的公共（或私有）仓库，团队所有成员均可向该仓库提交修改
          </Box>
          <Box component='li'>fork：创建一个其他用户的仓库的副本</Box>
          <Box component='li'>
            pull request：简称
            PR，指针对某个仓库，请求别人拉取并合并你的修改。通常，发起 pull
            request 的人都是从被请求人那里 clone 代码
          </Box>
          <Box component='li'>
            HEAD：表示当前工作区，使用 git checkout命令，可以把 HEAD
            指针切换到不同的分支、标签和 commit 上
          </Box>
        </Stack>
      </Box>
    </MainContent>
  );
};

export default _C;

import { useMemo, useState } from 'react';
import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TreeBox = styled(Box)({
  fontSize: '14px',
  wordBreak: 'break-all',
  wordWrap: 'break-word',
  color: '#555',
  backgroundColor: '#f8f8f8',
  border: '1px solid #dedede',
  padding: '14px',
  position: 'relative',
});

function convertFileListToTree(files: FileList, exclude: string[]) {
  const root = {
    path: '',
    name: 'root',
    type: 'directory',
    children: [],
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (exclude && file.webkitRelativePath) {
      if (
        exclude.some(
          (item) => file.webkitRelativePath.match(item) && item !== ''
        )
      ) {
        continue;
      }
    }
    const pathSegments = file.webkitRelativePath.split('/');

    let currentNode: any = root;
    for (let j = 0; j < pathSegments.length - 1; j++) {
      const pathSegment = pathSegments[j];
      const existingPath = currentNode.children.find(
        (child: any) => child.name === pathSegment && child.type === 'directory'
      );

      if (existingPath) {
        currentNode = existingPath;
      } else {
        const newDirectory: any = {
          path: `${currentNode.path}/${pathSegment}`,
          name: pathSegment,
          type: 'directory',
          children: [],
        };
        currentNode.children.push(newDirectory);
        currentNode = newDirectory;
      }
    }

    const fileExtension = file.name.split('.').pop();
    const newFile = {
      path: file.webkitRelativePath,
      name: file.name,
      type: 'file',
      extension: `.${fileExtension}`,
    };
    currentNode.children.push(newFile);
  }

  return root.children;
}

function convertTree(tree: any[], level = 0, indent = '') {
  let treeStr = '';

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const isLast = i === tree.length - 1;
    let curIndent = '';
    if (level > 0) {
      curIndent = indent + (isLast ? '└─ ' : '├─ ');
    }
    const path = `${curIndent}${node.name}`;
    treeStr += `${path}\n`;

    if (node.type === 'directory') {
      let nextIndent = indent;
      if (level > 0) {
        nextIndent += isLast ? '   ' : '│  ';
      }
      const subStr = convertTree(node.children, level + 1, nextIndent);
      treeStr += subStr;
    }
  }

  return treeStr;
}

const DirTree = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [folderTreeStr, setFolderTreeStr] = useState<string>('');
  const [exclude, setExclude] = useState<string>('');

  const selectedFolderName = useMemo(() => {
    if (!fileList || !fileList.length) {
      return '';
    }
    return fileList[0].webkitRelativePath?.split('/')[0];
  }, [fileList]);

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length) {
      setFileList(files as FileList);
    }
  };

  const handleGenerate = () => {
    if (!fileList || !fileList.length) {
      alert.warning('请先选择文件夹');
      return;
    }
    const folderTree = convertFileListToTree(fileList, exclude.split('\n'));

    const str = convertTree(folderTree) || '生成的文件树为空';
    setFolderTreeStr(str);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(folderTreeStr);
    alert.success('复制成功');
  };

  return (
    <MainContent>
      <Box>
        <Box>
          <Box>
            <Button
              variant='outlined'
              fullWidth
              sx={{ borderRadius: '4px', mb: 2, textTransform: 'none' }}
              onClick={handleClick}
            >
              {fileList && fileList.length
                ? `已选择文件夹 ${selectedFolderName}`
                : '选择文件夹'}
            </Button>
          </Box>
          <TextFieldWithClean
            value={exclude}
            variant='outlined'
            label='设置要排除的路径（可选）'
            multiline
            rows={3}
            placeholder='排除的文件夹/文件，一行一个'
            onClean={() => setExclude('')}
            onChange={(e) => setExclude(e.target.value)}
            sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
          />
          <Box my={2}>
            <Button
              size='small'
              variant='contained'
              sx={{ borderRadius: '4px' }}
              onClick={handleGenerate}
            >
              生成文件树
            </Button>
          </Box>
        </Box>
        {/** @ts-ignore */}
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          webkitdirectory='true'
          directory='true'
          sx={{ display: 'none' }}
          onChange={handleUpload}
        />
        {folderTreeStr && (
          <TreeBox>
            <Box sx={{ position: 'absolute', right: '14px' }}>
              <Button size='small' onClick={handleCopy}>
                复制
              </Button>
            </Box>
            <Box component={'pre'}>{folderTreeStr}</Box>
          </TreeBox>
        )}
        <Box mt={3}>
          <Typography variant='subtitle2' mb={1}>
            使用说明
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            1. 文件树可用于项目的目录结构介绍
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            2. 该功能由浏览器在本地完成，不会上传您的文件夹到服务器，请放心使用
          </Typography>
          <Typography sx={{ fontSize: '14px' }} my={1}>
            生成的效果如下：
          </Typography>
          <TreeBox component={'pre'} sx={{ fontSize: '12px' }}>
            {`test\n├─ 新建 Microsoft Excel 工作表.xlsx\n├─ 新建 Microsoft Word 文档.docx\n├─ 新建位图图像.bmp\n├─ 新建文本文档.txt\n└─ folder\n   └─ 新建文本文档.txt`}
          </TreeBox>
        </Box>
      </Box>
    </MainContent>
  );
};

export default DirTree;

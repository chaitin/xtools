import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import { ToolsForm } from '@/components/Tools';
import { saveFile } from '@/utils/download';
import { Button, Stack, TextField } from '@mui/material';
import { composerize } from 'composerize-ts';
import React, { useState } from 'react';

const DockerRunToDockerCompose: React.FC = () => {
  const [dockerRun, setDockerRun] = useState<string>(
    'docker run -p 8080:80 -d --name myapp nginx'
  );
  const [dockerCompose, setDockerCompose] = useState<string>('');
  const conversionResult = () => {
    const res = composerize(dockerRun.trim()).yaml;
    setDockerCompose(res);
  };
  const handleSaveFile = () => {
    saveFile(dockerCompose, 'docker-compose.yml');
  };
  return (
    <MainContent>
      <ToolsForm sx={{ width: '100%' }}>
        <TextFieldWithClean
          multiline
          minRows={4}
          value={dockerRun}
          onChange={(event) => setDockerRun(event.target.value)}
          placeholder='请输入docker run命令'
          onClean={() => {
            setDockerRun('');
            setDockerCompose('');
          }}
          variant='outlined'
        />
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button
            size='small'
            sx={{
              fontSize: '14px',
              width: '90',
              borderRadius: '4px',
              ml: 'auto',
              height: '28px',
            }}
            color='primary'
            variant='contained'
            onClick={conversionResult}
          >
            转换
          </Button>
          <Button
            size='small'
            sx={{
              fontSize: '14px',
              width: '90',
              borderRadius: '4px',
              ml: 'auto',
              height: '28px',
            }}
            color='primary'
            variant='contained'
            onClick={handleSaveFile}
          >
            导出 YAML
          </Button>
        </Stack>
        <TextField multiline variant='filled' value={dockerCompose} />
      </ToolsForm>
    </MainContent>
  );
};

export default DockerRunToDockerCompose;

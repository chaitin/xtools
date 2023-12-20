import alert from "@/components/Alert";
import MenuView from "@/components/MenuView";
import { defaultTextClick } from "@/constant";
import {
  Box,
  OutlinedInput,
  Stack,
  Typography,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import React, { useCallback, useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { styled } from "@mui/material/styles";

const MyLabel = styled("label")({
  cursor: "pointer",
});

const URLEncoder: React.FC = () => {
  const [method, setMethod] = React.useState("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const funcMap = useMemo(() => {
    const m = new Map<String, Function>();
    m.set("encode", encodeURI);
    m.set("decode", decodeURI);
    return m;
  }, []);

  const handleChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
    var fn = funcMap.get(method);
    if (fn) {
      setOutput(fn(input));
    }
  };

  const handleInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      var value = event.target.value;
      setInput(value);
      var fn = funcMap.get(method);
      if (fn) {
        setOutput(fn(value));
      }
    },
    [funcMap, method]
  );

  const handleCopyClick = useCallback(() => {
    alert.success("复制成功");
  }, []);

  const handleCleanClick = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <MenuView>
      <Stack
        sx={{
          mt: "24px",
          gap: "18px",
          maxWidth: "1020px",
          fontFamily: "Mono",
          width: "838px",
          mx: "auto",
        }}
      >
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} >
              <Tab
                label="编码"
                value="encode"
                sx={{ textTransform: "none !important" }}
              />
              <Tab
                label="解码"
                value="decode"
                sx={{ textTransform: "none !important" }}
              />
            </TabList>
          </Box>
        </TabContext>
        <Typography
          sx={{ width: "180px" }}
          variant="body2"
          color={defaultTextClick}
        >
          输入
        </Typography>
        <Box sx={{ position: "relative" }}>
          <OutlinedInput
            sx={{
              width: "100%",
              fontFamily: "Mono",
              textarea: { paddingRight: "35px" },
            }}
            value={input}
            onChange={handleInputChanged}
            margin="dense"
            minRows="5"
            maxRows="10"
            multiline
            autoFocus
          />
          <Box
            sx={{
              position: "absolute",
              right: "16px",
              top: "16px",
              width: "30px",
              paddingTop: "5px",
              height: "30px",
              textAlign: "center",
              bgcolor: "#eee",
              borderRadius: "50%",
              cursor: "pointer",
              color: input ? "#52C41A" : "#fff",
              "&:hover": {
                color: "#52C41A",
              },
            }}
          >
            <MyLabel onClick={handleCleanClick}>
              <CleaningServicesRoundedIcon fontSize="small" />
            </MyLabel>
          </Box>
        </Box>
        <Typography
          sx={{ width: "180px" }}
          variant="body2"
          color={defaultTextClick}
        >
          输出
        </Typography>
        <Box sx={{ position: "relative" }}>
          <OutlinedInput
            sx={{
              width: "100%",
              fontFamily: "Mono",
              textarea: { paddingRight: "35px" },
            }}
            value={output}
            margin="dense"
            minRows="5"
            maxRows="10"
            multiline
            readOnly 
          />
          <Box
            sx={{
              position: "absolute",
              right: "16px",
              top: "16px",
              width: "30px",
              paddingTop: "5px",
              height: "30px",
              textAlign: "center",
              bgcolor: "#eee",
              borderRadius: "50%",
              cursor: "pointer",
              color: input ? "#52C41A" : "#fff",
              "&:hover": {
                color: "#52C41A",
              },
            }}
          >
            <CopyToClipboard text={output} onCopy={handleCopyClick}>
              <ContentCopyIcon fontSize="small" />
            </CopyToClipboard>
          </Box>
        </Box>
      </Stack>
    </MenuView>
  );
};

export default URLEncoder;

 // ** React Imports
import { Fragment, useState } from 'react'

//import { clickButton1 } from 'src/zemu/zPPTIndex'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  Description, // Input Topic与要求
  CloudUpload, // 导入外部资料
  TextFields, // Input Text
  UploadFile, // Upload File
  Link, // Input Web Address
  List, // Import Outline
  KeyboardArrowDown,
  KeyboardArrowRight,
  PlayCircleFilled, // Generate Now
} from "@mui/icons-material";


const StepOneInputData = ({ setActiveStep, setInputData }: any) => {
  // ** States

  // 状态管理
  const [selectedOption, setSelectedOption] = useState("InputData"); // 默认选中 "Content Input"
  const [inputType, setInputType] = useState("inputTopic"); // 默认选中 "Input Topic与要求"
  const [importOption, setImportOption] = useState("inputText"); // 默认选中 "Input Text"
  const [inputText, setInputText] = useState("2025年就业市场预测"); // 输入框内容
  const [showMoreOptions, setShowMoreOptions] = useState(false); // 是否显示More Generation Requirements
  const [moreOptions, setMoreOptions] = useState({ moreRequirement: "", language: "zh-CN", outlineLength: "regular" }); // More Generation Requirements的内容

  // 处理选项切换
  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  // 处理输入类型切换
  const handleInputTypeChange = (type: any) => {
    setInputType(type);
  };

  // 处理导入选项切换
  const handleImportOptionChange = (option: any) => {
    setImportOption(option);
  };

  // 处理More Generation Requirements的显示/隐藏
  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  // 处理Generate Now按钮点击
  const handleGenerateOutline = () => {
    console.log("生成 PPTX 的参数：", {
      selectedOption,
      inputType,
      importOption,
      inputText,
      moreOptions,
    });
    //clickButton1();
    setInputData((prevState: any) => ({...prevState, selectedOption, inputType, importOption, inputText, moreOptions}))
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  };

  return (
    <Box sx={{  }}>
      {/* 第一行：两个按钮 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant={selectedOption === "InputData" ? "contained" : "outlined"}
          color={selectedOption === "InputData" ? "primary" : "inherit"}
          onClick={() => handleOptionChange("InputData")}
          startIcon={<CloudUpload />} // 
        >
          Content Input
        </Button>
      </Box>
  
      {/* 第二行：根据选项显示不同内容 */}
      {selectedOption === "InputData" && (
        <>
          {/* 四个按钮 */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant={inputType === "inputTopic" ? "contained" : "outlined"}
          color={inputType === "inputTopic" ? "primary" : "inherit"}
          onClick={() => handleInputTypeChange("inputTopic")}
          startIcon={<Description />} // Input Topic与要求图标
        >
          Input Topic
        </Button>
        <Button
          variant={inputType === "importData" ? "contained" : "outlined"}
          color={inputType === "importData" ? "primary" : "inherit"}
          onClick={() => handleInputTypeChange("importData")}
          startIcon={<CloudUpload />} // 导入外部资料图标
        >
          Import Data
        </Button>
      </Box>
      
      {/* Input Topic与要求 */}
      {inputType === "inputTopic" && (
        <TextField
          fullWidth
          label="Please Input Topic"
          variant="outlined"
          value={inputText}
          onChange={(e: any) => setInputText(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
      )}
      {inputType === "importData" && (
        <>
          {/* 四个按钮 */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 4 }}>
            <Button
              variant={importOption === "inputText" ? "contained" : "outlined"}
              color={importOption === "inputText" ? "primary" : "inherit"}
              onClick={() => handleImportOptionChange("inputText")}
              startIcon={<TextFields />}
            >
              Input Text
            </Button>
            <Button
              variant={importOption === "uploadFile" ? "contained" : "outlined"}
              color={importOption === "uploadFile" ? "primary" : "inherit"}
              onClick={() => handleImportOptionChange("uploadFile")}
              startIcon={<UploadFile />}
            >
              Upload File
            </Button>
            <Button
              variant={importOption === "inputUrl" ? "contained" : "outlined"}
              color={importOption === "inputUrl" ? "primary" : "inherit"}
              onClick={() => handleImportOptionChange("inputUrl")}
              startIcon={<Link />}
            >
              Input Web Address
            </Button>
            <Button
              variant={importOption === "importOutline" ? "contained" : "outlined"}
              color={importOption === "importOutline" ? "primary" : "inherit"}
              onClick={() => handleImportOptionChange("importOutline")}
              startIcon={<List />}
            >
              Import Outline
            </Button>
          </Box>

          {/* 动态显示输入框 */}
          {importOption === "inputText" && (
            <TextField
              fullWidth
              label="Please Input Text"
              variant="outlined"
              multiline
              rows={4}
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
              sx={{ mb: 2, mt: 2 }}
            />
          )}

          {importOption === "inputUrl" && (
            <TextField
              fullWidth
              label="Please Input Web Address"
              variant="outlined"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
              sx={{ mb: 2, mt: 2 }}
            />
          )}
        </>
      )}

        </>
      )}


      {/* More Generation Requirements */}
      <Button
        variant="text"
        color="primary"
        onClick={toggleMoreOptions}
        sx={{ cursor: "pointer", mb: 2 }}
        endIcon={
          showMoreOptions ? (
            <KeyboardArrowRight sx={{ verticalAlign: "middle" }} />
          ) : (
            <KeyboardArrowDown sx={{ verticalAlign: "middle" }} />
          )
        }
      >
        More Generation Requirements
      </Button>

      {showMoreOptions && (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size={"small"}
            label="Please enter more requirements"
            variant="outlined"
            value={moreOptions.moreRequirement}
            onChange={(e: any) =>
              setMoreOptions({ ...moreOptions, moreRequirement: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          {/* 大纲篇幅选择 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">Outline Length:</Typography>
            <Select
              size={'small'}
              value={moreOptions.outlineLength}
              onChange={(e: any) =>
                setMoreOptions({ ...moreOptions, outlineLength: e.target.value })
              }
              displayEmpty
              sx={{my: 1}}
            >
              <MenuItem value="" disabled>
                Please select
              </MenuItem>
              <MenuItem value="short">Short 10-15 pages</MenuItem>
              <MenuItem value="regular">Regular 20-30 pages</MenuItem>
              <MenuItem value="long">Longer 25-35 pages</MenuItem>
            </Select>
          </Box>
          {/* 下拉框和文本提示 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">Select Language:</Typography>
            <Select
              size={"small"}
              value={moreOptions.language}
              onChange={(e: any) =>
                setMoreOptions({ ...moreOptions, language: e.target.value })
              }
              displayEmpty
              sx={{my: 1}}
            >
              <MenuItem value="" disabled>
                Please select
              </MenuItem>
              <MenuItem value="zh-CN">Chinese</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </Box>
        </Box>
      )}

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateOutline}

            //onClick={clickButton1}
            startIcon={<PlayCircleFilled />}
          >
            Generate Now
          </Button>
        </Grid>
      </Grid>

    </Box>
  )
}

export default StepOneInputData
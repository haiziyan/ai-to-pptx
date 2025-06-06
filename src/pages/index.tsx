// ** React Imports
import { useState } from 'react';

import AiPPTX from 'src/views/AiPPTX/AiPPTX'
import Setting from 'src/views/AiPPTX/Setting'

import { ReactNode } from 'react'

import { Box } from '@mui/material';

import BlankLayout from 'src/@core/layouts/BlankLayout'

const AiPPTXModel = () => {



  const [pageMode] = useState("AiToPPTX");

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box sx={{ padding: 3 }}>
        {pageMode == "AiToPPTX" && <AiPPTX />}
        {pageMode == "Setting" && <Setting />}
      </Box>

    </Box>
  )
}

AiPPTXModel.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

AiPPTXModel.guestGuard = true

export default AiPPTXModel

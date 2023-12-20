import { Autocomplete, Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";

import { primary } from "@/constant";
import { AllTags, routesMenu, type Tool } from "@/utils/tools";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App() {
  const router = useRouter();

  // const [searchText, setSearchText] = useState<string>('')
  const [tools] = useState<Tool[]>(routesMenu)
  const [tags] = useState<(typeof AllTags)[number][]>(AllTags)

  return (
    <Box sx={{ width: '100%', height: '100%', pt: 4 }}>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        <Typography variant="h5" fontFamily='Mono'><Typography fontFamily='Mono' variant="h5" component='span' color='primary'>X</Typography>TOOLS</Typography>
        <Paper sx={{ width: '600px', borderRadius: '4px', ml: 1,  '& .MuiInput-underline': { height: '44px', borderBottom: 'none' } }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            filterOptions={(menu, state) => menu.filter(item => {
              return item.label.toUpperCase().includes(state.inputValue?.toUpperCase())
                || item.subTitle.toUpperCase().includes(state.inputValue?.toUpperCase())
            })}
            onInputChange={(v: any) => {
              setTimeout(() => {
                const item = routesMenu.find(item => [v.target.textContent, v.target.value].includes(item.label))
                console.log(v, item, [v.target.textContent, v.target.value])
                if (item) {
                  router.push(item.path)
                }
              });
            }}
            options={routesMenu}
            sx={{ height: '100%' }}
            renderInput={(params) =>
              <Stack direction='row'>
                <IconButton sx={{ padding: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <TextField
                  // autoFocus
                  {...params}
                  sx={{ height: '100%' }}
                />
              </Stack>
            }
          />
        </Paper>
      </Stack>
      <Stack sx={{ width: '100%', maxWidth: '760px', mx: 'auto', mt: '50px' }} spacing={3}>
        {tags.map(section => (
          [
            <Stack key={section.name} direction='row' alignItems='center'>
              <section.icon sx={{ mr: 2 }} />{section.label}
            </Stack>,
            <Stack key={section.name + 'body'} direction='row' spacing={2}>
              {tools.filter(tool => tool.tags.includes(section.name)).map(item => (
                <Link className='custom-link' key={item.label} href={item.path}>
                  <Button variant='contained' size="small" sx={{ borderRadius: '4px', background: primary }}>{item.label}</Button>
                </Link>
              ))}
            </Stack>
          ]
        ))}
      </Stack>
    </Box>
  );
}


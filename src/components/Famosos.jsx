import { Avatar, IconButton, Stack, Toolbar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const Famosos = ({ famosoSel, setFamosoSel }) => {
  const [isSelected, setIsSelected] = useState(0);
  const famosos = [
    "Albert Einstein",
    "Leonardo da Vinci",
    "William Shakespeare",
    "Nelson Mandela",
    "Elon Musk",
    " Beyoncé",
    "Cristiano Ronaldo",
    "Asistente Virtual",
  ];

  const urls = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg",
    "https://www.thefamouspeople.com/profiles/images/leonardo-da-vinci-6.jpg",
    "https://th.bing.com/th/id/OIP.zU_BFHiZmyaENDP4R3j67wHaG3?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.dF3rfgxNpxrZ9cjTPZwhBQHaGo?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/R.7e045758f281cb39156cb46e3adf1bc6?rik=LnN%2foHW2A6G3cw&riu=http%3a%2f%2fstatic3.businessinsider.com%2fimage%2f556e35f56bb3f7192014f8a2%2felon-musk-is-so-obsessed-with-hiring-he-wanted-to-poach-the-best-yogurt-shop-employee.jpg&ehk=SIapjMxfRFOissBK%2fSGYUiTqFofszXzzNJdUZoUo%2fvU%3d&risl=&pid=ImgRaw&r=0",
    " https://th.bing.com/th/id/R.faadb025046614a9b55149bf8ef0b3f5?rik=K0LZLz%2bdYpSAhA&riu=http%3a%2f%2fwallpapersdsc.net%2fwp-content%2fuploads%2f2016%2f01%2fBeyonce-Wallpapers-HD.jpg&ehk=%2fQgci4bbJCO9fEd21317cmv1tMpXaFJY4VAnNZbM1GU%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.1MrXVIq7cDw-lOFQhVQ5YQHaKh?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.syWIXHRKFwrWClHE6z9i9QHaEK?pid=ImgDet&rs=1",
  ];

  useEffect(() => {
    setFamosoSel({ nombre: famosos[0], urlAvatar: urls[0] });
  }, []);

  const handleClick = (seleccion) => {
    // localStorage.setItem("nombre", famosos[seleccion]);
    // localStorage.setItem("urlAvatar", urls[seleccion]);
    setFamosoSel({ nombre: famosos[seleccion], urlAvatar: urls[seleccion] });
    setIsSelected(seleccion);
  };
  // 0 Albert Einstein
  // 1 Leonardo da Vinci
  // 2 William Shakespeare
  // 3 Nelson Mandela
  // 4 Elon Musk
  // 5 Beyoncé
  // 6 Cristiano Ronaldo

  return (
    <Stack sx={{ m: 1, mr: 2, mb: 12 }}>
      <IconButton
        onClick={() => handleClick(0)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 0 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Albert Einstein">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg"
          />
        </Tooltip>
      </IconButton>

      <IconButton
        onClick={() => handleClick(1)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 1 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Leonardo da Vinci">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://www.thefamouspeople.com/profiles/images/leonardo-da-vinci-6.jpg"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(2)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 2 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title=" William Shakespeare">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/OIP.zU_BFHiZmyaENDP4R3j67wHaG3?pid=ImgDet&rs=1"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(3)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 3 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Nelson Mandela">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/OIP.dF3rfgxNpxrZ9cjTPZwhBQHaGo?pid=ImgDet&rs=1"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(4)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 4 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Elon Musk">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/R.7e045758f281cb39156cb46e3adf1bc6?rik=LnN%2foHW2A6G3cw&riu=http%3a%2f%2fstatic3.businessinsider.com%2fimage%2f556e35f56bb3f7192014f8a2%2felon-musk-is-so-obsessed-with-hiring-he-wanted-to-poach-the-best-yogurt-shop-employee.jpg&ehk=SIapjMxfRFOissBK%2fSGYUiTqFofszXzzNJdUZoUo%2fvU%3d&risl=&pid=ImgRaw&r=0"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(5)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 5 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Beyoncé">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/R.faadb025046614a9b55149bf8ef0b3f5?rik=K0LZLz%2bdYpSAhA&riu=http%3a%2f%2fwallpapersdsc.net%2fwp-content%2fuploads%2f2016%2f01%2fBeyonce-Wallpapers-HD.jpg&ehk=%2fQgci4bbJCO9fEd21317cmv1tMpXaFJY4VAnNZbM1GU%3d&risl=&pid=ImgRaw&r=0"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(6)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 6 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Cristiano Ronaldo">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/OIP.1MrXVIq7cDw-lOFQhVQ5YQHaKh?pid=ImgDet&rs=1"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(7)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 7 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Best IA Assintent">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src="https://th.bing.com/th/id/OIP.syWIXHRKFwrWClHE6z9i9QHaEK?pid=ImgDet&rs=1"
          />
        </Tooltip>
      </IconButton>
    </Stack>
  );
};

export default Famosos;

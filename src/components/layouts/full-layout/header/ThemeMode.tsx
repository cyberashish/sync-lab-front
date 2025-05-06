import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setThemeMode } from "@/store/slices/themeModeSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

export default function ThemeMode() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeMode.theme);
  const handleTheme = () => {
     if(theme === "light"){
      dispatch(setThemeMode("dark"));
      localStorage.setItem("theme" , "dark");
     }else{
      dispatch(setThemeMode("light"));
      localStorage.setItem("theme" , "light");
     }
  }
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("class" , theme);
  },[theme])
  return (
    <>
      <button onClick={handleTheme} className="relative after:absolute group after:w-10 after:h-10 after:bg-primary/10 after:start-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-all cursor-pointer after:z-10">
        <Icon
          icon={`${theme === "light" ? 'solar:moon-linear' : 'solar:sun-linear'}`}
          width={24}
          height={24}
          className="text-dark  relative z-20 group-hover:text-primary"
        />
      </button>
    </>
  );
}

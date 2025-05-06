import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes/Routes'
import { useAppSelector } from './hooks/hooks'

function App() {

  const theme = useAppSelector((state) => state.themeMode.theme);

  return (
    <div className={`${theme} bg-background min-h-screen`} >
       <RouterProvider router={router} />
    </div>
  ) 
}

export default App

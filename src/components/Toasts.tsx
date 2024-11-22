import { createContext, ReactNode, useContext, useState } from "react";

type Toast = { id: number, message: string }
const ToastsContext = createContext<{ toasts: Toast[], showToast: (v: string) => void }>({
  toasts: [],
  showToast: (m: string) => { console.log(m); }
})

export function useToaster(){
  const {showToast} = useContext(ToastsContext)
  return showToast
}

export default function Toaster({ children }:{children:ReactNode}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const hideToast = (id: number, timeout?: ReturnType<typeof setTimeout>) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
    if (timeout)
      clearTimeout(timeout)
  }

  const showToast = (message: string) => {
    const id = new Date().getTime()
    setToasts(prev => prev.concat({ message, id }))
    const tm = setTimeout(() => {
      hideToast(id, tm)
    }, 3000)
  }

  return <ToastsContext.Provider value={{ toasts, showToast }}>
    {toasts.length > 0 && <div className="fixed bottom-0 left-0 max-w-dwv min-h-32 z-20 p-3 flex flex-col gap-2">
      {toasts.map(toast => (
        <div key={toast.id} className="xs:w-full p-3 w-64 bg-white border dark:bg-black dark:text-white rounded-md shadow-sm">
          {toast.message}
        </div>
      ))}
    </div>}
    <ToastsContext.Consumer>
      {() => children}
    </ToastsContext.Consumer>
  </ToastsContext.Provider>
}
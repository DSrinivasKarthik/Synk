import { useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/theme'

export const Navigation = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigate('/')}
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Synk Notes
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 
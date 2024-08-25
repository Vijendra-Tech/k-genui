import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import { SquareArrowRight } from 'lucide-react'
import { SquareArrowOutUpRight } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type charrtBoxProps = {
  delay: number
  header: string
  children?: React.ReactNode,
  data:any
}
const ChartBox = ({ delay, header, children,data }: charrtBoxProps) => {
  return (
    <motion.div
      className="bg-zinc-50 p-4 rounded-lg shadow-md w-96"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay }}
    >
      <h1 className="text-lg font-semibold">{header}</h1>
      <div className="flex justify-center items-center h-32">
        {' '}
        <Line data={data} />
      </div>
    </motion.div>
  )
}
const Dashboard = () => {
  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    datasets: [
      {
        label: 'This Week',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      },
      {
        label: 'Last Week',
        data: [8, 11, 5, 6, 4, 7, 10],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)'
      }
    ]
  }
  return (
    <>
      <div className="flex flex-col gap-2 float-start px-60">
        <motion.h1
          className="text-4xl font-bold mt-20"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Hello Sarah, Good Morning
        </motion.h1>
        <div>
          <motion.div
            className="text-lg mt-5 flex flex-col gap-2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-3xl font-bold">Total Conversation</p>
            <p className="text-3xl text-green-500">20000</p>
          </motion.div>
        </div>
        <div className="flex gap-4 justify-center mt-10">
          <ChartBox delay={1.5} header="All Conversation" data={data} />
          <ChartBox delay={1.7} header="Resolved Conversation" data={data} />
          <ChartBox delay={1.9} header="Pending Conversation" data={data} />
        </div>
        <h1 className="text-2xl font-semibold mt-10">Quick Links</h1>
        <hr className="border-2 border-gray-300" />
        <div className="flex gap-2">
          <div className="bg-zinc-50 rounded-lg shadow-md p-4 w-[40rem] flex flex-col ">
            <div className="flex justify-between">
              <p className="underline">Last Conversation</p>
              <SquareArrowOutUpRight size={24} />
            </div>

            <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              A fast-growing footwear retailer (ie Allbirds) has expanded into
              many new geographies over the past couple years. Recently, they
              have seen their supply chain costs increase significantly and are
              having trouble shipping products to stores and customers
              efficiently, leading to lost revenue from missed sales
            </p>
          </div>
          <div className="bg-zinc-50 p-4 rounded-lg shadow-md w-[15rem]">
            <div className="flex flex-col justify-center items-center">
              New Process
              <SquareArrowRight size={24} />
            </div>
          </div>
          <div className="bg-zinc-50 p-4 rounded-lg shadow-md w-[15rem]">
            <div className="flex flex-col justify-center items-center">
              History
              <SquareArrowRight size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

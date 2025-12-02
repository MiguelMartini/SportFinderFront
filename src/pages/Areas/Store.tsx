import MapStore from '@/components/custom/MapStore'
import Navbar from '@/components/custom/Navbar'

type Props = {}

const Store = (props: Props) => {
  return (
    <div>
        <div>
            <Navbar/>
            <div className='w-full flex justify-center items-center flex-col mt-10'>
                <div>
                    <p className='p-4 flex justify-start font-bold text-2xl'>Cadastrar Área Esportiva</p>
                </div>
                <div className='w-[80%] h-[70vh] border border-gray-300 shadow-xl/20  rounded-xl overflow-hidden backdrop-blur-lg'>
                    <MapStore/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Store
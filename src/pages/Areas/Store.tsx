import MapStore from '@/components/custom/MapStore'
import Menu from '@/components/custom/Menu'
import React from 'react'

type Props = {}

const Store = (props: Props) => {
  return (
    <div>
        <div>
            <Menu/>
            <div className='w-full h-screen flex justify-center items-center flex-col mt-6'>
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
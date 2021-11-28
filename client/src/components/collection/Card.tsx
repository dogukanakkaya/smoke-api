import { ChangeEvent, useState } from 'react'
import { ICollection } from '../../context/collection/types'
import useCollection from '../../context/collection/useCollection'

const Card = ({ collection }: { collection: ICollection }) => {
    const { update, destroy } = useCollection()
    const [title, setTitle] = useState<string>(collection.title)
    const [showButtons, setShowButtons] = useState<boolean>(false)

    const handleUpdate = async (_id: string) => {
        await update(_id, { title })
    }

    const handleDestroy = async (_id: string) => {
        await destroy(_id)
    }

    return (
        <div className="p-4 shadow bg-white transition duration-300 hover:bg-gray-100 h-48" onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="flex items-center text-gray-700"><i className="bi bi-list"></i> <input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} onBlur={() => handleUpdate(collection._id)} className="px-2 py-1 outline-none" /></div>
                    <div className={`${!showButtons ? 'invisible opacity-0' : ''}`}>
                        <span className="cursor-pointer mx-2 mb-2 flex flex-col items-center justify-center w-6 h-6 rounded-full bg-red-400 hover:bg-red-500 text-white" onClick={() => handleDestroy(collection._id)}><i className="bi bi-x"></i></span>
                        <span className="cursor-pointer mx-2 mb-2 flex flex-col items-center justify-center w-6 h-6 rounded-full bg-blue-400 hover:bg-blue-500 text-white" onClick={() => handleDestroy(collection._id)}><i className="bi bi-folder-plus"></i></span>
                    </div>
                </div>
                <div>
                    <span className="text-xs"><i className="bi bi-clock"></i> {collection.createdAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Card
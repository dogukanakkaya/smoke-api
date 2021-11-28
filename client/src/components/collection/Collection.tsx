import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { ICollection } from '../../context/collection/types'
import useCollection from '../../context/collection/useCollection'

const Collection = ({ collection }: { collection: ICollection }) => {
    const { update, destroy } = useCollection()
    const [title, setTitle] = useState<string>(collection.title)
    const [showButtons, setShowButtons] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleUpdate = async (_id: string) => {
        await update(_id, { title })
    }

    const handleDestroy = async (_id: string) => {
        await destroy(_id)
    }

    return (
        <li onClick={() => navigate(`/${collection._id}`)} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100" >
            <span><i className="bi bi-chevron-right"></i> <input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} onBlur={() => handleUpdate(collection._id)} className="px-2 py-1 outline-none" /></span>
            <div className={`${!showButtons ? 'invisible opacity-0' : ''} flex items-center`}>
                <span className="cursor-pointer flex flex-col items-center justify-center w-6 h-6 rounded-full bg-red-400 hover:bg-red-500 text-white" onClick={() => handleDestroy(collection._id)}><i className="bi bi-x"></i></span>
            </div>
        </li >
    )
}

export default Collection
import { ChangeEvent, useState } from 'react'
import { ICollection } from '../../context/collection/types'
import useCollection from '../../context/collection/useCollection'

const Card = ({ collection }: { collection: ICollection }) => {
    const { update } = useCollection()
    const [title, setTitle] = useState<string>(collection.title)

    const handleUpdate = async (_id: string) => {
        await update(_id, { title })
    }

    return (
        <div className="p-4 shadow bg-white transition duration-300 hover:bg-gray-100 h-48">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-700"><i className="bi bi-list"></i> <input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} onBlur={() => handleUpdate(collection._id)} className="px-2 py-1 outline-none" /></h1>
                    <span className="cursor-pointer hover:text-gray-800"><i className="bi bi-three-dots"></i></span>
                </div>
                <div>
                    <span className="text-xs"><i className="bi bi-clock"></i> {collection.createdAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Card
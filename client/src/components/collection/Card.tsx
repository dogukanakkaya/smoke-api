import { Collection } from "../../types/collection"

const Card = ({ collection }: { collection: Collection }) => {
    return (
        <div className="p-4 shadow bg-white transition duration-300 hover:bg-gray-100 h-48">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-700"><i className="bi bi-list"></i> {collection.title}</h1>
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
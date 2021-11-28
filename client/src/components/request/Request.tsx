import { useParams } from 'react-router'

const Request = () => {
    const params = useParams()

    console.log(params)

    return (
        <div className="col-span-9">
            <div className="bg-white">
                <div className="flex justify-between items-center border-b pl-2 h-14 bg-white">
                    <span className="w-8 h-8 flex items-center justify-center cursor-pointer text-xl transition rounded hover:bg-gray-100"><i className="bi bi-plus"></i></span>
                </div>
            </div>
        </div>
    )
}

export default Request
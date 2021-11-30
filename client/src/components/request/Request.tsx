import { useEffect } from 'react'
import { useParams } from 'react-router'

const Request = () => {
    const { _id } = useParams()

    useEffect(() => {
        (async () => {
            if (_id) {
                console.log(_id);
            }
        })()
    }, [_id])

    const createRequest = () => {

    }

    return (
        <div className="col-span-9">
            <div className="bg-white">
                <div className="flex justify-between items-center border-b pl-2 h-14">
                    <span onClick={createRequest} className="w-8 h-8 flex items-center justify-center cursor-pointer text-xl transition rounded hover:bg-gray-100"><i className="bi bi-plus"></i></span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Request
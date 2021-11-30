import { useNavigate } from 'react-router'
import { IRequest } from '../../context/collection/types'

const Requests = ({ requests }: { requests: IRequest[] }) => {
    return (
        <ul>
            {
                requests.map((request: IRequest) => <Request key={request._id} request={request} />)
            }
        </ul>
    )
}

const Request = ({ request }: { request: IRequest }) => {
    const navigate = useNavigate()

    return (
        <li onClick={() => navigate(`/request/${request._id}`)} className="cursor-pointer pl-10 p-2 hover:bg-gray-100">
            <span className="text-xxs pr-1 text-green-400">{request.method}</span> {request.title}
        </li>
    )
}

export default Requests
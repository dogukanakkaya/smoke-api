import Collections from './Collections'
import QuickAccess from '../../components/collection/QuickAccess'
import Form from '../../components/form/Form'

const Sidebar = ({ setShowCreateModal }: { setShowCreateModal: Function }) => {
    return (
        <div className="col-span-3 grid grid-cols-3 border-r">
            <div className="col-span-3">
                <div className="flex justify-between items-center border-b pl-2 h-14 bg-white">
                    <h1 className="text-base font-bold text-gray-800">Scratch Pad</h1>
                    <div>
                        <Form.Button onClick={() => setShowCreateModal(true)} className="bg-white text-gray-600 hover:bg-gray-100">New</Form.Button>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <QuickAccess />
            </div>
            <div className="col-span-2">
                <Collections />
            </div>
        </div>
    )
}

export default Sidebar
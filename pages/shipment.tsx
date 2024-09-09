import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { BaseLayout } from '@ui';
import { toast } from "react-toastify";
import router from 'next/router';

const Shipment = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
    const [shippingMeta, setShippingMeta] = useState({
        deliveryNumber: '',
        status: '',
        withdraw: '',
    });


    interface Shipment {
        id: number;
        owner: any;
        artName: any;
        address: any;
        status: any;
        withdraw: any;
        postalCode: any;
        price: any;
        tokenId: any;
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('https://luxsy-admin.blocdev.id/api/shipment', {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: currentPage, perPage: perPage },
        })
            .then(response => {
                setShipments(response.data.data.data);
            })
            .catch(error => {
                console.error('Error fetching shipments:', error);
            });
        if (shippingMeta.status && shippingMeta.withdraw) {
            handleUpdate();
        }
    }, [currentPage, perPage, shippingMeta.status, shippingMeta.withdraw]);

    const handleUpdate = () => {
        const token = sessionStorage.getItem('token');
        if (selectedShipment) {
            axios.put('https://luxsy-admin.blocdev.id/api/shipment/${selectedShipment!.id}?status=${shippingMeta.status}&withdraw=${shippingMeta.withdraw}&deliveryNumber=${shippingMeta.deliveryNumber}', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    // alert('Shipment status updated successfully');
                    toast.success("Shipment status updated successfully");
                    setShipments(shipments.map(shipment => shipment.id === selectedShipment.id ? response.data.data : shipment));
                    setIsPopupVisible(false);
                    setShippingMeta({ ...shippingMeta, status: '', withdraw: '' });
                    setSelectedShipment(null);
                })
                .catch(error => {
                    toast.success("Refresh token!");
                    router.push('/');
                    // console.error('Error updating shipment:', error);
                });
        }
    };


    const handleDelete = (id: any) => {
        const token = sessionStorage.getItem('token');
        axios.delete('https://luxsy-admin.blocdev.id/api/shipment/${id}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                toast.success("Shipment deleted successfully");
                setShipments(shipments.filter(shipment => shipment.id !== id));
            })
            .catch(error => {
                console.error('Error deleting shipment:', error);
            });
    };

    const filteredShipments = shipments.filter(shipment =>
        shipment.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.artName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.withdraw.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.postalCode.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePopupToggle = (shipment: any) => {
        setSelectedShipment(shipment);
        setShippingMeta({ ...shippingMeta, status: '', withdraw: '', deliveryNumber: shipment.deliveryNumber });
        setIsPopupVisible(!isPopupVisible);
    };

    const handleApprove = () => {
        if (selectedShipment) {
            if (selectedShipment.status === 'pending' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'sending', withdraw: 'pending' });

            } else if (selectedShipment.status === 'sending' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'done', withdraw: 'pending' });

            } else if (selectedShipment.status === 'done' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'done', withdraw: 'done' });

            }
        }

    }

    const handleDecline = () => {
        if (selectedShipment) {
            if (selectedShipment.status === 'pending' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'pending', withdraw: 'pending' });

            } else if (selectedShipment.status === 'sending' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'pending', withdraw: 'pending' });

            } else if (selectedShipment.status === 'done' && selectedShipment.withdraw === 'pending') {
                setShippingMeta({ ...shippingMeta, status: 'sending', withdraw: 'pending' });

            } else if (selectedShipment.status === 'done' && selectedShipment.withdraw === 'done') {
                setShippingMeta({ ...shippingMeta, status: 'done', withdraw: 'pending' });

            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShippingMeta({ ...shippingMeta, [name]: value });
    }

    return (
        <BaseLayout>
            <div className="pb-16 pt-8 bg-white overflow-hidden min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                    <div className="p-4">
                        <div className="flex justify-between mb-4 gap-6">
                            <div className="bg-[#776B5D] text-white text-start rounded p-6 shadow-md w-1/4">
                                <h3 className="text-lg font-light">Transaction</h3>
                                <p className="text-xl font-semibold">{shipments.reduce((total, shipment) => total + (shipment.price || 0), 0).toPrecision(7)} <span className='text-[#ffffffb1] text-sm'>ETH</span></p>
                            </div>
                            <div className="bg-[#1B9A74] text-white text-start rounded p-6 shadow-md w-1/4">
                                <h3 className="text-lg font-light">Withdraw</h3>
                                <p className="text-xl font-semibold">{shipments.filter(shipment => shipment.withdraw === 'done').length} <span className='text-[#ffffffb1] text-sm'>ETH</span></p>
                            </div>
                            <div className="bg-[#FF9F30] text-white text-start rounded p-6 shadow-md w-1/4">
                                <h3 className="text-lg font-light">Shipping Pending</h3>
                                <p className="text-xl font-semibold">{shipments.filter(shipment => shipment.status === 'pending').length} <span className='text-[#ffffffb1] text-sm'>NFT</span></p>
                            </div>
                            <div className="bg-[#1771EE] text-white text-start rounded p-6 shadow-md w-1/4">
                                <h3 className="text-lg font-light">Shipping Done</h3>
                                <p className="text-xl font-semibold">{shipments.filter(shipment => shipment.status === 'done').length} <span className='text-[#ffffffb1] text-sm'>NFT</span></p>
                            </div>
                        </div>

                        <div className="flex justify-between my-4 items-center">
                            <h3 className="text-lg font-bold text-center">Transaction</h3>
                            <input
                                type="text"
                                placeholder="Search by owner, art name, address or postal code ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-2/4 p-2 rounded border border-gray-300 focus:ring-[#776B5D] focus:border-[#776B5D]" />
                        </div>

                        <table className="min-w-full bg-white border border-gray-200 rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Token ID</th>
                                    <th className="py-2 px-4 border-b">Art Name</th>
                                    <th className="py-2 px-4 border-b">Price</th>
                                    <th className="py-2 px-4 border-b">Owner</th>
                                    <th className="py-2 px-4 border-b">Address</th>
                                    <th className="py-2 px-4 border-b">Postal Code</th>
                                    <th className="py-2 px-4 border-b">Shipping Status</th>
                                    <th className="py-2 px-4 border-b">Withdraw</th>
                                    <th className="py-2 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredShipments.map((shipment) => (
                                    <tr key={shipment.id} className='text-center'>
                                        <td className="py-2 px-4 border-b">{shipment.tokenId}</td>
                                        <td className="py-2 px-4 border-b">{shipment.artName}</td>
                                        <td className="py-2 px-4 border-b">{shipment.price.toString().slice(0, 7)}</td>
                                        <td className="py-2 px-4 border-b">{`${shipment.owner.slice(0, 5)}...${shipment.owner.slice(-4)}`}</td>
                                        <td className="py-2 px-4 border-b">{shipment.address}</td>
                                        <td className="py-2 px-4 border-b">{shipment.postalCode}</td>
                                        <td className="py-2 px-4 border-b"><button className={`px-2 py-1 rounded text-xs ${shipment.status === "pending"
                                            ? "bg-[#FFF7DA] text-[#E6A601]"
                                            : shipment.status === "sending"
                                                ? "bg-[#BDECFE] text-[#36B8EA]"
                                                : shipment.status === "done"
                                                    ? "bg-[#DDF6E8] text-[#28C76F]"
                                                    : ""
                                            }`}>{shipment.status}</button></td>
                                        <td className="py-2 px-4 border-b"><button className={`px-2 py-1 rounded text-xs ${shipment.withdraw === "pending"
                                            ? "bg-[#FFF7DA] text-[#E6A601]"
                                            : shipment.withdraw === "done"
                                                ? "bg-[#DDF6E8] text-[#28C76F]"
                                                : ""
                                            }`}>{shipment.withdraw}</button></td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handlePopupToggle(shipment)}

                                                className="mr-2 px-2 py-1 text-[#8E8478] rounded text-xs group">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#8E8478]">
                                                    <path className="group-hover:fill-[#8E8478]" opacity="0.5" d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z" fill="#1C274C" />
                                                    <path className="group-hover:fill-[#8E8478]" d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z" fill="#1C274C" />
                                                </svg>

                                            </button>
                                            <button
                                                onClick={() => handleDelete(shipment.id)}
                                                className="px-2 py-1 text-[#FF0000] rounded text-xs group">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#FF0000]">
                                                    <path d="M3 6.52381C3 6.12932 3.32671 5.80952 3.72973 5.80952H8.51787C8.52437 4.9683 8.61554 3.81504 9.45037 3.01668C10.1074 2.38839 11.0081 2 12 2C12.9919 2 13.8926 2.38839 14.5496 3.01668C15.3844 3.81504 15.4756 4.9683 15.4821 5.80952H20.2703C20.6733 5.80952 21 6.12932 21 6.52381C21 6.9183 20.6733 7.2381 20.2703 7.2381H3.72973C3.32671 7.2381 3 6.9183 3 6.52381Z"
                                                        fill="#1C274C"
                                                        className="group-hover:fill-[#FF0000]" />
                                                    <path
                                                        opacity="0.5"
                                                        d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12405C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001Z"
                                                        fill="#1C274C"
                                                        className="group-hover:fill-[#FF0000]" />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.42543 11.4815C9.83759 11.4381 10.2051 11.7547 10.2463 12.1885L10.7463 17.4517C10.7875 17.8855 10.4868 18.2724 10.0747 18.3158C9.66253 18.3592 9.29499 18.0426 9.25378 17.6088L8.75378 12.3456C8.71256 11.9118 9.01327 11.5249 9.42543 11.4815Z"
                                                        fill="#1C274C"
                                                        className="group-hover:fill-[#FF0000]" />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M14.5747 11.4815C14.9868 11.5249 15.2875 11.9118 15.2463 12.3456L14.7463 17.6088C14.7051 18.0426 14.3376 18.3592 13.9254 18.3158C13.5133 18.2724 13.2126 17.8855 13.2538 17.4517L13.7538 12.1885C13.795 11.7547 14.1625 11.4381 14.5747 11.4815Z"
                                                        fill="#1C274C"
                                                        className="group-hover:fill-[#FF0000]" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Main modal */}
                        {isPopupVisible && (
                            <div tabIndex={-1} aria-hidden="true" className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
                                <div className={`relative p-4 w-full max-w-md max-h-full transition-transform duration-300 transform ${isPopupVisible ? 'translate-y-0' : 'translate-y-[-100px]'
                                    }`}>
                                    {/* Modal content */}
                                    <div className="relative bg-white rounded-lg shadow">
                                        {/* Modal header */}
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Status
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={handlePopupToggle}
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center ">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        {/* Modal body */}
                                        <div className="p-4 md:p-5">
                                            <ol className="relative border-l border-gray-200 ms-3.5 mb-4 md:mb-5">
                                                {/* Timeline Item 1 */}
                                                <li className="mb-10 ms-8">
                                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                                        </svg>
                                                    </span>
                                                    <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                                                        Approve Transaction
                                                        {/* <span className="bg-[#DDF6E8] text-[#28C76F] text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Done</span> */}
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C" />
                                                        </svg>
                                                    </h3>
                                                </li>
                                                {/* Add more timeline items here */}
                                                {/* Timeline Item 1 */}
                                                <li className="mb-10 ms-8">
                                                    {(selectedShipment!.status === 'pending') ? (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C" />
                                                            <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#1C274C" />
                                                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#1C274C" />
                                                            <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                                        </svg>
                                                    </span>) : (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                                        </svg>
                                                    </span>)
                                                    }

                                                    <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                                                        <div>
                                                            Shipment
                                                            <div className="mt-1">
                                                                <textarea
                                                                    id="deliveryNumber"
                                                                    name="deliveryNumber"
                                                                    value={shippingMeta.deliveryNumber}
                                                                    onChange={handleChange}
                                                                    disabled={selectedShipment!.status !== 'pending' ? true : false}
                                                                    rows={2}
                                                                    className={`shadow-sm focus:ring-[#776B5D] ${(selectedShipment!.status !== "pending") && `bg-gray-300`}  focus:border-[#776B5D] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md`}
                                                                    placeholder="Some delivery number..." />
                                                            </div>
                                                        </div>
                                                        {(selectedShipment!.status === 'pending') ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.1139 21.9317C14.1495 22.7453 11.9881 22.9582 9.90278 22.5434C7.81749 22.1287 5.90202 21.1048 4.39861 19.6014C2.89519 18.098 1.87135 16.1825 1.45656 14.0972C1.04177 12.0119 1.25466 9.85046 2.0683 7.88615C2.88194 5.92185 4.2598 4.24293 6.02763 3.0617C7.79545 1.88048 9.87386 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C10.1705 2.75 8.38213 3.2925 6.86098 4.30891C5.33983 5.32531 4.15423 6.76996 3.45412 8.46018C2.75401 10.1504 2.57083 12.0103 2.92774 13.8046C3.28465 15.5989 4.16563 17.2471 5.45927 18.5407C6.7529 19.8344 8.4011 20.7154 10.1954 21.0723C11.9897 21.4292 13.8496 21.246 15.5398 20.5459C17.23 19.8458 18.6747 18.6602 19.6911 17.139C20.7075 15.6179 21.25 13.8295 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 14.1262 22.1195 16.2046 20.9383 17.9724C19.7571 19.7402 18.0782 21.1181 16.1139 21.9317Z" fill="#1C274C" />
                                                            <path d="M14.6869 1.58861C14.2858 1.48537 13.8769 1.72686 13.7737 2.128C13.6704 2.52914 13.9119 2.93802 14.3131 3.04127C17.5625 3.8776 20.1223 6.43745 20.9586 9.68684C21.0619 10.088 21.4708 10.3295 21.8719 10.2262C22.273 10.123 22.5145 9.71409 22.4113 9.31295C21.4387 5.5343 18.4656 2.56117 14.6869 1.58861Z" fill="#1C274C" />
                                                        </svg>) : (selectedShipment!.status === 'sending') ?
                                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.9563 14.0949C13.763 14.2644 13.5167 14.3629 13.024 14.56C10.7142 15.4839 9.55936 15.9459 8.89971 15.4976C8.7433 15.3913 8.6084 15.2564 8.50212 15.1C8.05386 14.4404 8.51582 13.2855 9.43973 10.9757C9.6368 10.483 9.73533 10.2367 9.9048 10.0434C9.94799 9.99419 9.99435 9.94782 10.0436 9.90464C10.2368 9.73517 10.4832 9.63663 10.9759 9.43956C13.2856 8.51565 14.4405 8.0537 15.1002 8.50196C15.2566 8.60824 15.3915 8.74314 15.4978 8.89954C15.946 9.5592 15.4841 10.7141 14.5602 13.0239C14.3631 13.5165 14.2646 13.7629 14.0951 13.9561C14.0519 14.0054 14.0055 14.0517 13.9563 14.0949Z" fill="#1C274C" />
                                                            </svg>)
                                                            : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C" />
                                                            </svg>)}
                                                    </h3>
                                                </li>
                                                {/* Add more timeline items here */}
                                                {/* Timeline Item 1 */}
                                                <li className="mb-10 ms-8">
                                                    {(selectedShipment!.withdraw === 'pending') ? (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C" />
                                                            <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#1C274C" />
                                                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#1C274C" />
                                                            <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                                        </svg>
                                                    </span>) : (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                                        </svg>
                                                    </span>)
                                                    }
                                                    <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                                                        Withdraw
                                                        {(selectedShipment!.withdraw === 'pending') ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.1139 21.9317C14.1495 22.7453 11.9881 22.9582 9.90278 22.5434C7.81749 22.1287 5.90202 21.1048 4.39861 19.6014C2.89519 18.098 1.87135 16.1825 1.45656 14.0972C1.04177 12.0119 1.25466 9.85046 2.0683 7.88615C2.88194 5.92185 4.2598 4.24293 6.02763 3.0617C7.79545 1.88048 9.87386 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C10.1705 2.75 8.38213 3.2925 6.86098 4.30891C5.33983 5.32531 4.15423 6.76996 3.45412 8.46018C2.75401 10.1504 2.57083 12.0103 2.92774 13.8046C3.28465 15.5989 4.16563 17.2471 5.45927 18.5407C6.7529 19.8344 8.4011 20.7154 10.1954 21.0723C11.9897 21.4292 13.8496 21.246 15.5398 20.5459C17.23 19.8458 18.6747 18.6602 19.6911 17.139C20.7075 15.6179 21.25 13.8295 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 14.1262 22.1195 16.2046 20.9383 17.9724C19.7571 19.7402 18.0782 21.1181 16.1139 21.9317Z" fill="#1C274C" />
                                                            <path d="M14.6869 1.58861C14.2858 1.48537 13.8769 1.72686 13.7737 2.128C13.6704 2.52914 13.9119 2.93802 14.3131 3.04127C17.5625 3.8776 20.1223 6.43745 20.9586 9.68684C21.0619 10.088 21.4708 10.3295 21.8719 10.2262C22.273 10.123 22.5145 9.71409 22.4113 9.31295C21.4387 5.5343 18.4656 2.56117 14.6869 1.58861Z" fill="#1C274C" />
                                                        </svg>) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C" />
                                                        </svg>)}
                                                    </h3>
                                                </li>
                                                {/* Add more timeline items here */}
                                            </ol>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b gap-2">
                                            {(selectedShipment!.status === 'done' || selectedShipment!.status === 'sending') &&
                                                <button
                                                    onClick={handleDecline}
                                                    type="button"
                                                    className="w-full bg-[#FF0000] text-white hover:bg-[#AA0000] hover:text-white rounded text-sm px-4 py-2">
                                                    Decline
                                                </button>
                                            }
                                            {(selectedShipment!.withdraw === 'pending') &&
                                                <button
                                                    onClick={handleApprove}
                                                    type="button"
                                                    className="w-full bg-[#776B5D] text-white hover:bg-[#4F473E] hover:text-white rounded text-sm px-4 py-2">
                                                    Approve
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <label htmlFor="per-page" className="mr-2">Showing</label>
                                <select
                                    id="per-page"
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                                    className="rounded border border-gray-300  focus:ring-[#776B5D] focus:border-[#776B5D]">
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="mr-2 px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={filteredShipments.length < perPage}
                                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout >
    );
};

export default Shipment;

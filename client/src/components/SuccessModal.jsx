/**
 * ============================================
 * SUCCESS MODAL COMPONENT
 * ============================================
 * 
 * A beautiful confirmation modal that appears after
 * a successful booking submission. It displays:
 * - Success icon with animation
 * - Booking confirmation message
 * - Booking details summary
 * - Close button
 * 
 * Props:
 * - isOpen: Boolean to control modal visibility
 * - onClose: Function to call when closing modal
 * - bookingData: Object containing the booking details
 */

const SuccessModal = ({ isOpen, onClose, bookingData }) => {
    // Don't render if modal is closed
    if (!isOpen) return null;

    return (
        // Modal overlay - covers the entire screen
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Semi-transparent backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal container - centered */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal content */}
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 modal-animate">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Success icon with checkmark */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Success message */}
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        Booking Confirmed!
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Your appointment has been successfully scheduled.
                    </p>

                    {/* Booking details card */}
                    <div className="rounded-xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #F6F0D7 0%, #C5D89D 100%)' }}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#330867' }}>
                            Booking Details
                        </h3>

                        <div className="space-y-3">
                            {/* Name */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3" style={{ color: '#330867' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-700">{bookingData?.name}</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3" style={{ color: '#330867' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-700">{bookingData?.email}</span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3" style={{ color: '#330867' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-700">{bookingData?.date}</span>
                            </div>

                            {/* Time Slot */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3" style={{ color: '#330867' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">{bookingData?.timeSlot}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}
                    >
                        Done
                    </button>

                    {/* Additional info */}
                    <p className="text-center text-gray-400 text-sm mt-4">
                        A confirmation email will be sent to your email address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;

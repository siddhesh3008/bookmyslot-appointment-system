/**
 * ============================================
 * HOME PAGE COMPONENT
 * ============================================
 * 
 * The landing page that displays:
 * - Hero section with welcome message
 * - Booking form for users to make appointments
 * 
 * This is the main user-facing page where customers
 * can book their appointments for February 2026.
 */

import BookingForm from '../components/BookingForm';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="py-12 md:py-20 px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Book Your <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                            Appointment Today
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Schedule your slot with just a few clicks. Choose from available dates in February 2026 and pick a time that works for you.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Easy Booking
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Instant Confirmation
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Flexible Time Slots
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <BookingForm />
            </div>

            {/* Footer */}
            <footer className="py-8 text-center text-white/60 text-sm">
                <p>© 2026 BookMySlot. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;

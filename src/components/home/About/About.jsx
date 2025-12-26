
const About = () => {
    return (
        <section className="py-20 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/*  Main About Content */}
                <div className="grid items-center grid-cols-1 gap-16 mb-20 lg:grid-cols-2">
                    {/* Left content */}
                    <div className="space-y-8"> 
                        <div className="space-y-6">
                            <div className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-full bg-accent-cyan/10 text-primary-blue">
                             <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"  
                             >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />

                             </svg>
                             <span> About Medizy </span>

                            </div>
                            <h2 className="text-4xl font-bold leading-tight md:text-5xl text-primary-dark" >
                                Revolutionizing

                                <span className="block text-primary-blue">
                                  Healthcare Access
                                </span>

                            </h2>

                            <p className="text-lg leading-relaxed text-neutral-gray">
                                Medizy is your trusted digital healthcare companion,
                                connecting patients with qualified medical professionals through
                                our innovative appointment booking platform. We're committed to
                                making quality healthcare accessible, convenient, and reliable.

                            </p>
                            <p className="text-base leading-relaxed text-neutral-gray">
                                Our platform bridges the gap between patients and healthcare
                                providers, offering seamless appointment scheduling,
                                comprehensive doctor profiles, and a user-friendly experience
                                that puts your health first.
                            </p>

                        </div>
                        {/* Key Features */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" >
                            <div className="flex items-start space-x-3">
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-primary-blue/10">
                                 <svg
                                  className="w-4 h-4 text-primary-blue"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                 
                                 >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>

                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-primary-dark">
                                    Verified Doctors

                                    </h4>
                                    <p className="text-xs text-neutral-gray">
                                        All Medical Professionals are thoroughly verified
                                    </p>

                                </div>
                               
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-accent-cyan/10">
                                    <svg
                                     className="w-4 h-4 text-primary-blue"
                                     fill="currentColor"
                                     viewBox="0 0 24 24"
                                     
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />

                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-primary-dark">
                                     Easy Booking
 
                                    </h4>
                                    <p className="text-xs text-neutral-gray">
                                        Simple and quick appointment scheduling

                                    </p>
                                </div>

                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-primary-blue/10">
                                 <svg
                                    className="w-4 h-4 text-primary-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                 >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                 </svg>

                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-primary-dark">
                                        24/7 Support

                                    </h4>
                                    <p className="text-xs text-neutral-gray">
                                        Round-the-clock customer assistance

                                    </p>

                                </div>

                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-accent-cyan/10">
                                     <svg
                                        className="w-4 h-4 text-primary-blue"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                    </svg>

                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-primary-dark">
                                        Secure Platform

                                    </h4>
                                    <p className="text-xs text-neutral-gray">
                                        Your data is protected with top-level security

                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Right content Image */}
                    <div className="relative">

                    </div>

                </div>

                {/* Statistics Section */}
                <div  className="p-8 mb-20 bg-gradient-to-r from-primary-blue/5 to-accent-cyan/5 rounded-3xl md:p-12">

                </div>


                {/* Mission & vision */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                </div>



            </div>

        </section>

    );



};

export default About;
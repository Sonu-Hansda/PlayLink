import FuzzyText from "../components/FuzzyText"

function NotFound() {
    return (
        <div className="max-w-3xl flex flex-col mx-auto size-full">
            <FuzzyText
                baseIntensity={0.05}
                hoverIntensity={0}
                enableHover={false}
            >
                404 | Not Found
            </FuzzyText>
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                <p className="mt-3 text-gray-600">Oops, something went wrong.</p>
                <p className="text-gray-600">Sorry, we couldn't find your page.</p>
                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                    <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-500 text-white hover:bg-orange-600 focus:outline-hidden focus:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none" href="../examples.html">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back to examples
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NotFound
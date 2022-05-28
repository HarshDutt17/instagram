import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Photos({ photos }) {
    // console.log(photos)
    return (
        <div className='h-16 border-t border-gray-primary mt-12 mobiles:mt-6 pt-4'>
            <div className='grid grid-cols-3 gap-8 mobiles:gap-2 mt-4 mobiles:mt-2 mb-12'>
                {!photos ? (
                    <div className='flex col-span-3 mx-auto'>
                        <Skeleton count={1} height={320} width={320} className='mx-2' />
                        <Skeleton count={1} height={320} width={320} className='mx-2' />
                        <Skeleton count={1} height={320} width={320} className='mx-2' />
                    </div>
                ) : photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.docId} className='relative group'>
                            <img src={photo.imageSrc} alt={photo.caption} />
                            <div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'>
                                <p className='flex items-center text-white font-bold '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    {photo.likes.length}
                                </p>
                                <p className='flex items-center text-white font-bold'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {photo.comments.length}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-2xl font-bold text-gray-base text-center col-span-3 my-20'>
                        No posts yet
                    </div>
                )}
            </div>
        </div>
    )
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired,
}
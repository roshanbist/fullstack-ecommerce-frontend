const Newsletter = () => {
  return (
    <section className='bg-palette-ebony py-14 border-t border-t-palette-accent'>
      <div className='max-container w-full'>
        <div className='max-w-[580px] mx-auto text-center text-color-primary'>
          <h3 className='text-2xl md:text-3xl font-medium mb-5'>
            Get the Good Stuff
          </h3>
          <p className='mb-5 text-[18px]'>
            Sign up for our updates and newsletter and get a code for{' '}
            <b className='text-blue-500'>10% OFF </b>
            your first order.
          </p>
          <div className='w-full flex flex-wrap items-center gap-2'>
            <input
              type='text'
              placeholder='Enter your valid email'
              className='h-[51px] py-3 px-4 outline-none border border-palette-accent bg-palette-primary text-color-primary block shadow-lg flex-1'
            />
            <button className='btn-primary max-sm:w-full shadow-lg'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

import React from 'react'
import Rating from "react-rating";

function ListReviews({ reviews }) {
  return (
    <div>
       {reviews && reviews.map(review => (
      <article className="p-6 w-[800px] text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
 
        <React.Fragment key={review._id}>
          <footer key={review.id} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={review.avatar && review.avatar.url}
                  alt={review.name}/>{review.name}</p>

<Rating
        emptySymbol={
          <i className="far fa-star" style={{ color: "gray" }} />
        }
        fullSymbol={
          <i className="fas fa-star" style={{ color: "gold" }} />
        }
        initialRating={review.rating}
        readonly
      />
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{review.comment}</p>
        </React.Fragment> 
        <div className="flex">
  {review.images && review.images.map((image, index) => (
    <img
      key={index}
      className="mr-2 w-16 h-16 object-cover"
      src={image.url}
      alt={`Review ${index}`}
    />
  ))}
</div>
      </article>
        ))}
    </div>
  )
}

export default ListReviews
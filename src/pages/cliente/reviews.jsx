// components/ReviewsSection.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseDB } from '@/firebase/config';

export default function ReviewsSection({ productId }) {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Obtener reseñas del producto
  useEffect(() => {
    const q = query(
      collection(FirebaseDB, 'reviews'), 
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeReviews = onSnapshot(q, (querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    });

    return () => unsubscribeReviews();
  }, [productId]);

  // Enviar nueva reseña
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment) return;
    if (!user) {
      alert('Por favor inicia sesión para dejar una reseña');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reviewToAdd = {
        ...newReview,
        productId,
        userId: user.uid,
        userName: user.displayName || user.email || 'Usuario',
        userEmail: user.email,
        createdAt: new Date(),
      };

      // Actualización optimista
      setReviews(prev => [reviewToAdd, ...prev]);
      
      // Enviar a Firebase
      await addDoc(collection(FirebaseDB, 'reviews'), reviewToAdd);
      
      // Resetear formulario
      setNewReview({
        rating: 0,
        comment: "",
      });
    } catch (error) {
      console.error("Error adding review: ", error);
      setReviews(prev => prev.filter(r => r.id !== 'temp'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calcular promedio de reseñas
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Contar reseñas por estrella
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  if (authLoading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  return (
    <>
      <div className='bg-gray-50 p-6 rounded-lg mb-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/3'>
            <div className='text-sm font-medium mb-2'>{averageRating} Rating</div>
            <div className='flex items-center mb-4'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
            </div>
            <div className='text-sm'>{reviews.length} Reseñas</div>
          </div>

          <div className='md:w-1/3'>
            <div className='space-y-2'>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className='flex items-center'>
                  <span className='text-xs w-3'>{rating}</span>
                  <div className='w-full bg-gray-200 h-2 mx-2 rounded-full overflow-hidden'>
                    <div
                      className='bg-gray-700 h-full rounded-full'
                      style={{
                        width: reviews.length > 0 
                          ? `${(ratingCounts[rating - 1] / reviews.length) * 100}%`
                          : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formulario para nueva reseña */}
      <div className='mb-8 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-sm font-medium mb-4'>Escribe tu reseña</h3>
        {user ? (
          <form onSubmit={handleSubmitReview}>
            <div className='mb-4'>
              <label className='block text-sm mb-2'>Calificación:</label>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className='focus:outline-none cursor-pointer'
                  >
                    <svg
                      className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <div className='mb-4'>
              <label className='block text-sm mb-2'>Comentario:</label>
              <textarea
                className='w-full p-2 border rounded'
                rows='3'
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button
              type='submit'
              className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar tu reseña'}
            </button>
          </form>
        ) : (
          <p className='text-sm text-gray-600'>
            Por favor... <button className='text-blue-600 underline' onClick={() => navigate('/login')}>Inicia sesión para dejar una reseña...</button> 
          </p>
        )}
      </div>

      {/* Listado de reseñas existentes */}
      <div className='space-y-8'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className='border-t pt-6'>
              <div className='flex justify-between items-start mb-2'>
                <div>
                  <div className='font-medium'>{review.userName}</div>
                  <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className='text-xs text-gray-500'>
                  {review.createdAt?.toDate ? 
                    `Hace ${Math.floor((new Date() - review.createdAt.toDate()) / (1000 * 60 * 60 * 24))} días` : 
                    'Reciente'}
                </div>
              </div>
              <p className='text-sm mb-4'>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className='text-sm text-gray-500'>No hay reseñas aún. Sé el primero en opinar.</p>
        )}
      </div>
    </>
  );
}
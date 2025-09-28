const booksData = {
    1: {
        id: 1,
        title: "العادات الذرية",
        author: "جيمس كلير",
        price: "45 ريال",
        category: "تنمية بشرية",
        description: "كتاب رائع عن بناء العادات الصغيرة التي تقود إلى تغييرات كبيرة في الحياة. يناقش الكاتب كيفية تكوين عادات إيجابية والتخلص من العادات السلبية.",
        pages: 320,
        rating: 4.8,
        year: 2020,
        publisher: "دار نشر المعرفة",
        language: "العربية",
        isbn: "978-603-00-1234-5"
    },
    2: {
        id: 2,
        title: "قوة العادات",
        author: "تشارلز دوهيغ",
        price: "50 ريال",
        category: "تنمية بشرية",
        description: "كتاب يشرح العلم وراء كيفية عمل العادات ولماذا نفعله ما نفعله. يقدم استراتيجيات عملية لتغيير العادات الشخصية والمؤسسية.",
        pages: 400,
        rating: 4.6,
        year: 2018,
        publisher: "الدار العربية للعلوم",
        language: "العربية",
        isbn: "978-614-01-1234-5"
    },
    3: {
        id: 3,
        title: "القراءة السريعة",
        author: "توني بوزان",
        price: "35 ريال",
        category: "تعليم",
        description: "دليل عملي لتعلم تقنيات القراءة السريعة وتحسين الفهم والاستيعاب. يحتوي على تمارين وتقنيات مجربة.",
        pages: 280,
        rating: 4.4,
        year: 2021,
        publisher: "مكتبة العبيكان",
        language: "العربية",
        isbn: "978-996-054-1234-5"
    }
};

// دالة فتح نافذة الكتاب
function openBookModal(bookId) {
    // إظهار النافذة
    const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
    bookModal.show();
   
    // إظهار مؤشر التحميل
    document.getElementById('bookModalBody').innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">جاري التحميل...</span>
            </div>
            <p>جاري تحميل بيانات الكتاب...</p>
        </div>
    `;
   
    // محاكاة طلب Ajax (تأخير لمحاكاة جلب البيانات من الخادم)
    setTimeout(() => {
        loadBookData(bookId);
    }, 1500);
}

// دالة تحميل بيانات الكتاب
function loadBookData(bookId) {
    // محاكاة طلب Ajax إلى الخادم
    const book = booksData[bookId];
   
    if (book) {
        const bookHtml = `
            <div class="row">
                <div class="col-md-4 text-center">
                    <div class="book-cover mb-3">
                        <i class="fas fa-book-open fa-6x text-primary"></i>
                    </div>
                    <div class="book-rating">
                        ${generateStars(book.rating)}
                        <span class="text-muted">(${book.rating})</span>
                    </div>
                    <div class="book-price mt-2">
                        <h4 class="text-success">${book.price}</h4>
                    </div>
                </div>
                <div class="col-md-8">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="text-muted book-author">بواسطة: <strong>${book.author}</strong></p>
                   
                    <div class="book-description mb-4">
                        <h5>الوصف:</h5>
                        <p class="text-justify">${book.description}</p>
                    </div>
                   
                    <div class="row book-details">
                        <div class="col-6">
                            <p><strong><i class="fas fa-layer-group"></i> التصنيف:</strong></p>
                            <p><strong><i class="fas fa-language"></i> اللغة:</strong></p>
                            <p><strong><i class="fas fa-calendar"></i> سنة النشر:</strong></p>
                        </div>
                        <div class="col-6">
                            <p>${book.category}</p>
                            <p>${book.language}</p>
                            <p>${book.year}</p>
                        </div>
                        <div class="col-6">
                            <p><strong><i class="fas fa-file"></i> عدد الصفحات:</strong></p>
                            <p><strong><i class="fas fa-print"></i> الناشر:</strong></p>
                            <p><strong><i class="fas fa-barcode"></i> الرقم الدولي:</strong></p>
                        </div>
                        <div class="col-6">
                            <p>${book.pages} صفحة</p>
                            <p>${book.publisher}</p>
                            <p>${book.isbn}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
       
        document.getElementById('bookModalBody').innerHTML = bookHtml;
    } else {
        document.getElementById('bookModalBody').innerHTML = `
            <div class="text-center text-danger">
                <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                <h4>الكتاب غير موجود</h4>
                <p>عذراً، لم يتم العثور على بيانات الكتاب المطلوب.</p>
            </div>
        `;
    }
}

// دالة توليد النجوم للتقييم
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
   
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
   
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
   
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }
   
    return stars;
}

// دالة إضافة إلى السلة
function addToCart() {
    showNotification('تم إضافة الكتاب إلى سلة التسوق بنجاح!', 'success');
}

// دالة الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
   
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
        min-width: 300px;
    `;
   
    document.body.appendChild(notification);
   
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

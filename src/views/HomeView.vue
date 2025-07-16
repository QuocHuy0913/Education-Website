<template>
    <div class="homepage">
        <section class="potential">
            <div class="potential-content">
                <div class="potential-text">
                    <h1>Mở Khóa Tiềm Năng<br />Với Học Trực Tuyến</h1>
                    <p>Khám phá thế giới tri thức cùng các khóa học chất lượng, lịch học linh hoạt và cộng đồng hỗ trợ.
                    </p>
                    <div class="potential-buttons">
                        <button class="primary"
                                @click="router.push('/products')">Khám Phá Khóa Học</button>
                        <button class="secondary">Tìm Hiểu Thêm</button>
                    </div>
                </div>
                <div class="potential-image">
                    <img src="/images/Online-Learning.jpg"
                         alt="Học trực tuyến"
                         class="rounded-img" />
                </div>
            </div>
        </section>
        <section class="features">
            <h2>Tại Sao Chọn EduLearn?</h2>
            <p class="subtitle">Chúng tôi mang đến trải nghiệm học tập toàn diện, giúp bạn đạt được mục tiêu.</p>
            <div class="feature-list">
                <div class="feature-item"
                     v-for="(feature, i) in features"
                     :key="i">
                    <div class="icon"><span class="material-symbols-outlined">{{ feature.icon }}</span></div>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.text }}</p>
                </div>
            </div>
        </section>
        <section class="testimonials">
            <h2>Học Viên Nói Gì?</h2>
            <p class="subtitle">Lắng nghe chia sẻ từ những học viên đã thay đổi cuộc sống nhờ EduLearn.</p>
            <div class="testimonial-list">
                <div class="testimonial-item"
                     v-for="(t, i) in testimonials"
                     :key="i">
                    <p>"{{ t.text }}"</p>
                    <div class="user">
                        <div class="avatar"></div>
                        <div><strong>{{ t.name }}</strong><br /><small>{{ t.job }}</small></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const features = [
    { icon: 'book_ribbon', title: 'Khóa Học Đa Dạng', text: 'Học nhiều lĩnh vực khác nhau với giảng viên uy tín và giàu kinh nghiệm.' },
    { icon: 'connect_without_contact', title: 'Bài Học Tương Tác', text: 'Học qua bài giảng sinh động, bài kiểm tra và dự án thực tiễn.' },
    { icon: 'crowdsource', title: 'Cộng Đồng Hỗ Trợ', text: 'Kết nối với học viên và giảng viên trong một cộng đồng năng động.' },
]

const testimonials = [
    { text: 'EduLearn giúp tôi có kỹ năng để xin việc mơ ước. Giảng viên rất tận tâm!', name: 'Nguyễn Thị A', job: 'Lập trình viên' },
    { text: 'Tôi có thể học bất cứ lúc nào, điều đó thật tuyệt vời khi phải vừa đi làm vừa chăm con.', name: 'Trần Văn B', job: 'Chuyên viên marketing' },
    { text: 'Rất đáng để đầu tư thời gian. Khóa học dễ hiểu và thực tế.', name: 'Lê Thị C', job: 'Chuyên viên dữ liệu' },
];
</script>
<style scoped>
.homepage {
    font-family: sans-serif;
    color: #333;
    background: #edf2ff;
}

.potential,
.features,
.testimonials {
    padding: 60px 20px;
}

.potential-content,
.feature-list,
.testimonial-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Responsive 2 cột -> 1 cột */
.potential-content {
    flex-direction: row;
}

.potential-text {
    flex: 1;
    min-width: 300px;
    margin-right: 40px;
}

.potential-text h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.potential-text p,
.features .subtitle,
.testimonials .subtitle {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 20px;
    color: #666;
}

.potential-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.potential-buttons .primary,
.potential-buttons .secondary {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
}

.primary {
    background: #000;
    color: #fff;
    border: none;
}

.secondary {
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
}

.potential-image {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rounded-img {
    border-radius: 16px;
    max-width: 100%;
    height: auto;
}

.features {
    background: #f5f5f5;
    text-align: center;
}

.features h2,
.testimonials h2 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.feature-item,
.testimonial-item {
    background: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-item .icon {
    font-size: 2.2rem;
}

.feature-item h3 {
    font-size: 1.3rem;
    font-weight: bold;
}

.testimonials {
    background: #fff;
    text-align: center;
}

.testimonial-item {
    background: #f9f9f9;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.testimonial-item p {
    font-size: 1.05rem;
    font-style: italic;
    font-weight: 500;
}

.user {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}

.avatar {
    width: 40px;
    height: 40px;
    background: #bbb;
    border-radius: 50%;
}

.material-symbols-outlined {
    font-size: 54px;
}

/* ----------- Responsive (Mobile First) ----------- */
@media (max-width: 768px) {
    .potential-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .potential-text {
        margin-right: 0;
    }

    .potential-text h1 {
        font-size: 2rem;
    }

    .potential-text p {
        font-size: 1rem;
    }

    .potential-buttons {
        flex-direction: column;
        align-items: center;
    }

    .potential-buttons button {
        width: 100%;
        max-width: 250px;
    }

    .feature-item,
    .testimonial-item {
        width: 100%;
        max-width: 90%;
    }

    .feature-list,
    .testimonial-list {
        flex-direction: column;
        align-items: center;
    }

    .material-symbols-outlined {
        font-size: 40px;
    }
}

@media (max-width: 480px) {
    .potential-text h1 {
        font-size: 1.6rem;
    }

    .features h2,
    .testimonials h2 {
        font-size: 1.8rem;
    }

    .feature-item h3,
    .testimonial-item p {
        font-size: 1rem;
    }
}
</style>

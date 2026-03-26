import { PrismaClient, UserRole, CenterType, CareGrade, Gender } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertCenter() {
  return prisma.center.upsert({
    where: {
      code: 'CENTER-001',
    },
    update: {
      name: '은샘노인재가복지센터',
      type: CenterType.VISITING,
      address: '경기도 의정부시 시민로 123',
      phone: '031-123-4567',
      email: 'contact@eun-saem.kr',
      licenseNumber: '123-45-67890',
      isActive: true,
    },
    create: {
      name: '은샘노인재가복지센터',
      code: 'CENTER-001',
      type: CenterType.VISITING,
      address: '경기도 의정부시 시민로 123',
      phone: '031-123-4567',
      email: 'contact@eun-saem.kr',
      licenseNumber: '123-45-67890',
    },
  });
}

async function upsertUser({ email, name, role, centerId, phone, passwordHash }) {
  return prisma.user.upsert({
    where: { email },
    update: {
      name,
      role,
      centerId,
      phone: phone || null,
      password: passwordHash,
      isActive: true,
    },
    create: {
      email,
      password: passwordHash,
      name,
      role,
      centerId,
      phone,
    },
  });
}

async function upsertRecipient(data) {
  return prisma.recipient.upsert({
    where: {
      longTermCareId: data.longTermCareId,
    },
    update: data,
    create: data,
  });
}

async function main() {
  console.log('🌱 Starting database seed...');

  const center = await upsertCenter();
  console.log(`✅ Center ready: ${center.name}`);

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await upsertUser({
    email: 'admin@yoyang.kr',
    name: '관리자',
    role: UserRole.ADMIN,
    centerId: center.id,
    passwordHash,
  });

  const manager = await upsertUser({
    email: 'manager@eun-saem.kr',
    name: '이순옥',
    role: UserRole.MANAGER,
    centerId: center.id,
    phone: '010-1234-5678',
    passwordHash,
  });

  const worker = await upsertUser({
    email: 'worker@eun-saem.kr',
    name: '김복지',
    role: UserRole.WORKER,
    centerId: center.id,
    phone: '010-8765-4321',
    passwordHash,
  });

  console.log(`✅ Users ready: ${admin.email}, ${manager.email}, ${worker.email}`);

  const recipients = await Promise.all([
    upsertRecipient({
      centerId: center.id,
      name: '김어르신',
      birthDate: new Date('1945-03-15'),
      gender: Gender.MALE,
      phone: '010-1111-2222',
      address: '경기도 의정부시 가능동 123-45',
      emergencyContact: '김가족',
      emergencyPhone: '010-3333-4444',
      longTermCareId: '1234567890',
      careGrade: CareGrade.GRADE_2,
      gradeType: 'GENERAL',
      careStartDate: new Date('2023-01-15'),
      careEndDate: new Date('2026-01-14'),
      contractEndDate: new Date('2026-12-31'),
      diseases: [
        { code: 'I10', name: '고혈압' },
        { code: 'E11', name: '당뇨병' },
      ],
      allergies: [],
      specialNotes: '거동이 불편하심, 휠체어 사용',
      adlScore: 35,
      iadlScore: 20,
      lastEvalDate: new Date('2025-01-15'),
      nextEvalDate: new Date('2026-04-15'),
      isActive: true,
    }),
    upsertRecipient({
      centerId: center.id,
      name: '박어르신',
      birthDate: new Date('1942-07-20'),
      gender: Gender.FEMALE,
      phone: '010-5555-6666',
      address: '경기도 의정부시 호원동 678-90',
      emergencyContact: '박가족',
      emergencyPhone: '010-7777-8888',
      longTermCareId: '0987654321',
      careGrade: CareGrade.GRADE_3,
      gradeType: 'DEMENTIA',
      careStartDate: new Date('2023-06-01'),
      contractEndDate: new Date('2026-05-31'),
      diseases: [
        { code: 'G30', name: '치매' },
        { code: 'I25', name: '허혈성 심장질환' },
      ],
      allergies: [],
      specialNotes: '경도 치매, 가족과 동거 중',
      adlScore: 45,
      iadlScore: 15,
      lastEvalDate: new Date('2025-02-10'),
      nextEvalDate: new Date('2026-04-05'),
      isActive: true,
    }),
  ]);

  console.log(`✅ Recipients ready: ${recipients.length}`);
  console.log('\n🎉 Database seed completed!');
  console.log('\nSample login credentials:');
  console.log('  Admin:    admin@yoyang.kr / password123');
  console.log('  Manager:  manager@eun-saem.kr / password123');
  console.log('  Worker:   worker@eun-saem.kr / password123');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

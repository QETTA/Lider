import { PrismaClient, UserRole, CenterType, CareGrade, Gender } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample center
  const center = await prisma.center.create({
    data: {
      name: '은샘노인재가복지센터',
      code: 'CENTER-001',
      type: CenterType.VISITING,
      address: '경기도 의정부시 시민로 123',
      phone: '031-123-4567',
      email: 'contact@eun-saem.kr',
      licenseNumber: '123-45-67890',
    },
  });
  console.log(`✅ Created center: ${center.name}`);

  // Create sample users
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@yoyang.kr',
      password: passwordHash,
      name: '관리자',
      role: UserRole.ADMIN,
      centerId: center.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@eun-saem.kr',
      password: passwordHash,
      name: '이순옥',
      role: UserRole.MANAGER,
      centerId: center.id,
      phone: '010-1234-5678',
    },
  });

  const worker = await prisma.user.create({
    data: {
      email: 'worker@eun-saem.kr',
      password: passwordHash,
      name: '김복지',
      role: UserRole.WORKER,
      centerId: center.id,
      phone: '010-8765-4321',
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create sample recipients
  const recipients = await Promise.all([
    prisma.recipient.create({
      data: {
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
        contractEndDate: new Date('2026-01-14'),
        diseases: [
          { code: 'I10', name: '고혈압' },
          { code: 'E11', name: '당뇨병' },
        ],
        specialNotes: '거동이 불편하심, 휠체어 사용',
        adlScore: 35,
        iadlScore: 20,
        lastEvalDate: new Date('2024-01-15'),
        nextEvalDate: new Date('2025-01-15'),
      },
    }),
    prisma.recipient.create({
      data: {
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
        specialNotes: '경도 치매, 가족과 동거 중',
        adlScore: 45,
        iadlScore: 15,
      },
    }),
  ]);

  console.log(`✅ Created ${recipients.length} recipients`);

  // Create sample care records
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await Promise.all([
    prisma.careRecord.create({
      data: {
        recipientId: recipients[0].id,
        workerId: worker.id,
        type: 'VISIT',
        recordDate: today,
        visitTime: new Date(today.setHours(10, 0, 0, 0)),
        leaveTime: new Date(today.setHours(11, 30, 0, 0)),
        bloodPressure: '130/85',
        pulse: 72,
        activities: [
          { type: '신체활동', duration: 20, note: '간단한 스트레칭' },
          { type: '인지활동', duration: 15, note: '기억력 카드 게임' },
        ],
        meals: [
          { type: '간식', intake: 80, menu: '우유 + 과일' },
        ],
        condition: '전반적으로 양호함',
        specialNotes: '기분이 좋아 보이심',
      },
    }),
    prisma.careRecord.create({
      data: {
        recipientId: recipients[1].id,
        workerId: worker.id,
        type: 'VISIT',
        recordDate: yesterday,
        visitTime: new Date(yesterday.setHours(14, 0, 0, 0)),
        leaveTime: new Date(yesterday.setHours(15, 30, 0, 0)),
        bloodPressure: '125/80',
        pulse: 68,
        activities: [
          { type: '일상생활', duration: 30, note: '식사 도움' },
        ],
        condition: '평소와 같음',
        specialNotes: '가족분과 함께 계심',
      },
    }),
  ]);

  console.log(`✅ Created care records`);

  // Create sample documents
  await Promise.all([
    prisma.document.create({
      data: {
        recipientId: recipients[0].id,
        uploadedBy: manager.id,
        type: 'EVAL_FORM',
        status: 'VALIDATED',
        fileName: '김어르신_기능평가표_2024.pdf',
        fileUrl: '/uploads/sample1.pdf',
        fileSize: 1024000,
        mimeType: 'application/pdf',
        pageCount: 3,
        extractedData: {
          adlScore: 35,
          iadlScore: 20,
          careGrade: '2등급',
          evalDate: '2024-01-15',
        },
        confidence: 95,
      },
    }),
    prisma.document.create({
      data: {
        recipientId: recipients[1].id,
        uploadedBy: manager.id,
        type: 'DOCTOR_NOTE',
        status: 'EXTRACTED',
        fileName: '박어르신_의사소견서.pdf',
        fileUrl: '/uploads/sample2.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf',
        pageCount: 2,
        extractedData: {
          diagnosis: '치매, 고혈압',
          doctorName: '김의사',
          hospitalName: '의정부병원',
        },
        confidence: 88,
      },
    }),
  ]);

  console.log(`✅ Created documents`);

  // Create sample evaluation
  await prisma.evaluation.create({
    data: {
      recipientId: recipients[0].id,
      type: 'RE_EVAL',
      status: 'COMPLETED',
      evalDate: new Date('2024-01-15'),
      validUntil: new Date('2025-01-14'),
      score: 55,
      adlDetails: {
        mobility: 5,
        bathing: 2,
        dressing: 3,
        eating: 1,
        toileting: 4,
        continence: 3,
      },
      iadlDetails: {
        cooking: 1,
        cleaning: 1,
        laundry: 0,
        shopping: 0,
        medication: 2,
        finance: 0,
      },
      cognitiveScore: 15,
      hasDoctorNote: true,
      hasEvalForm: true,
      hasContract: true,
      aiSummary: 'ADL 점수 35점, IADL 점수 20점으로 2등급 유지. 전반적인 기능 저하가 관찰됨.',
      aiRecommendations: [
        { type: 'info', message: '2등급 유지 예상' },
        { type: 'warn', message: 'IADL 점수 저하 주의' },
      ],
    },
  });

  console.log(`✅ Created evaluation`);

  console.log('\n🎉 Database seed completed!');
  console.log('\nSample login credentials:');
  console.log('  Admin:    admin@yoyang.kr / password123');
  console.log('  Manager:  manager@eun-saem.kr / password123');
  console.log('  Worker:   worker@eun-saem.kr / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

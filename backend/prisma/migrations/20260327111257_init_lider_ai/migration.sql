-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'WORKER', 'VIEWER');

-- CreateEnum
CREATE TYPE "CenterType" AS ENUM ('VISITING', 'FACILITY', 'DAY_CARE', 'COMPLEX');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CareGrade" AS ENUM ('GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'PENDING');

-- CreateEnum
CREATE TYPE "GradeType" AS ENUM ('GENERAL', 'DEMENTIA', 'HOSPICE');

-- CreateEnum
CREATE TYPE "EvalType" AS ENUM ('INITIAL', 'RE_EVAL', 'CONTRACT', 'CHANGE', 'TERMINATION');

-- CreateEnum
CREATE TYPE "EvalStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'EXPIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('VISIT', 'DAY_CARE', 'OVERNIGHT', 'EMERGENCY', 'PHONE');

-- CreateEnum
CREATE TYPE "ConsultType" AS ENUM ('INITIAL', 'REGULAR', 'CRISIS', 'FAMILY', 'COORDINATION');

-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('EVAL_FORM', 'DOCTOR_NOTE', 'DIAGNOSIS', 'CONTRACT', 'CARE_PLAN', 'CARE_RECORD', 'GENERAL');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('PENDING', 'PROCESSING', 'EXTRACTED', 'VALIDATED', 'ERROR', 'REJECTED');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('VISIT_REMINDER', 'VISIT_OVERDUE', 'VISIT_COMPLETED', 'SCHEDULE_CHANGED', 'NEW_DOCUMENT', 'CONSULTATION_DUE', 'EMERGENCY_ALERT', 'SYSTEM_NOTICE');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'WORKER',
    "phone" TEXT,
    "centerId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "centers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CenterType" NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "licenseNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipients" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "emergencyContact" TEXT,
    "emergencyPhone" TEXT,
    "longTermCareId" TEXT,
    "careGrade" "CareGrade",
    "gradeType" "GradeType",
    "careStartDate" TIMESTAMP(3),
    "careEndDate" TIMESTAMP(3),
    "contractEndDate" TIMESTAMP(3),
    "diseases" JSONB,
    "disabilities" JSONB,
    "medications" JSONB,
    "allergies" TEXT[],
    "specialNotes" TEXT,
    "adlScore" INTEGER,
    "iadlScore" INTEGER,
    "lastEvalDate" TIMESTAMP(3),
    "nextEvalDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "type" "EvalType" NOT NULL,
    "status" "EvalStatus" NOT NULL DEFAULT 'PENDING',
    "evalDate" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "score" INTEGER,
    "adlDetails" JSONB,
    "iadlDetails" JSONB,
    "cognitiveScore" INTEGER,
    "hasDoctorNote" BOOLEAN NOT NULL DEFAULT false,
    "hasEvalForm" BOOLEAN NOT NULL DEFAULT false,
    "hasContract" BOOLEAN NOT NULL DEFAULT false,
    "missingDocs" TEXT[],
    "aiSummary" TEXT,
    "aiRecommendations" JSONB,
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_records" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "type" "RecordType" NOT NULL,
    "recordDate" TIMESTAMP(3) NOT NULL,
    "visitTime" TIMESTAMP(3),
    "leaveTime" TIMESTAMP(3),
    "bloodPressure" TEXT,
    "pulse" INTEGER,
    "temperature" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bloodSugar" INTEGER,
    "activities" JSONB,
    "meals" JSONB,
    "elimination" JSONB,
    "sleepStatus" TEXT,
    "condition" TEXT,
    "specialNotes" TEXT,
    "incidentReport" TEXT,
    "aiDraftId" TEXT,
    "location" JSONB,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "care_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "type" "ConsultType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aiDraft" TEXT,
    "aiEdited" BOOLEAN NOT NULL DEFAULT false,
    "result" TEXT,
    "actionItems" JSONB,
    "familyPresent" BOOLEAN NOT NULL DEFAULT false,
    "familyNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "type" "DocType" NOT NULL,
    "status" "DocStatus" NOT NULL DEFAULT 'PENDING',
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "extractedData" JSONB,
    "extractedText" TEXT,
    "confidence" DOUBLE PRECISION,
    "validationErrors" JSONB,
    "missingFields" TEXT[],
    "pageCount" INTEGER,
    "ocrEngine" TEXT,
    "aiModel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_data_cache" (
    "id" TEXT NOT NULL,
    "apiType" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_data_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_onboarding_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "roleContext" TEXT,
    "centerType" TEXT,
    "teamSize" TEXT,
    "onboardingGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "setupPriorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "communicationChannel" TEXT,
    "handoverNote" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_onboarding_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_schedules" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "scheduledTime" TIMESTAMP(3),
    "estimatedDurationMinutes" INTEGER,
    "status" "VisitStatus" NOT NULL DEFAULT 'SCHEDULED',
    "visitType" "RecordType" NOT NULL DEFAULT 'VISIT',
    "notes" TEXT,
    "locationNote" TEXT,
    "completedAt" TIMESTAMP(3),
    "relatedCareRecordId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visit_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "relatedEntityType" TEXT,
    "relatedEntityId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "channels" JSONB,
    "scheduledFor" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "centers_code_key" ON "centers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "recipients_longTermCareId_key" ON "recipients"("longTermCareId");

-- CreateIndex
CREATE UNIQUE INDEX "public_data_cache_cacheKey_key" ON "public_data_cache"("cacheKey");

-- CreateIndex
CREATE INDEX "audit_logs_userId_createdAt_idx" ON "audit_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_resource_resourceId_idx" ON "audit_logs"("resource", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "user_onboarding_profiles_userId_key" ON "user_onboarding_profiles"("userId");

-- CreateIndex
CREATE INDEX "visit_schedules_workerId_scheduledDate_idx" ON "visit_schedules"("workerId", "scheduledDate");

-- CreateIndex
CREATE INDEX "visit_schedules_recipientId_scheduledDate_idx" ON "visit_schedules"("recipientId", "scheduledDate");

-- CreateIndex
CREATE INDEX "visit_schedules_status_scheduledDate_idx" ON "visit_schedules"("status", "scheduledDate");

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_createdAt_idx" ON "notifications"("userId", "isRead", "createdAt");

-- CreateIndex
CREATE INDEX "notifications_type_createdAt_idx" ON "notifications"("type", "createdAt");

-- CreateIndex
CREATE INDEX "notifications_scheduledFor_idx" ON "notifications"("scheduledFor");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_records" ADD CONSTRAINT "care_records_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_records" ADD CONSTRAINT "care_records_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_onboarding_profiles" ADD CONSTRAINT "user_onboarding_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_schedules" ADD CONSTRAINT "visit_schedules_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_schedules" ADD CONSTRAINT "visit_schedules_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

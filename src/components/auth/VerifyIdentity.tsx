'use client';

import { useState, type DragEvent } from 'react';
import {
  Upload,
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  IdCard,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

type DocumentType =
  | 'PASSPORT'
  | 'PAN_CARD'
  | 'NATIONAL_ID'
  | 'DRIVERS_LICENSE';

interface UploadedFiles {
  front: File | null;
  back: File | null;
}

export default function VerifyIdentity() {
  const [documentType, setDocumentType] =
    useState<DocumentType>('PASSPORT');

  const [files, setFiles] =
    useState<UploadedFiles>({
      front: null,
      back: null,
    });

  const [isDragging, setIsDragging] =
    useState<'front' | 'back' | null>(null);

  const [error, setError] =
    useState<string>('');
  const [isLoading, setIsLoading] =
    useState(false);

  const requiresBack =
    documentType === 'NATIONAL_ID' ||
    documentType === 'DRIVERS_LICENSE';

  const acceptedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
  ];

  const validateFile = (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      return 'Only JPG, PNG or PDF files are allowed';
    }

    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be under 5MB';
    }

    return '';
  };

  const handleFile = (
    side: 'front' | 'back',
    file: File
  ) => {
    const validationError =
      validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    setFiles((prev) => ({
      ...prev,
      [side]: file,
    }));
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    side: 'front' | 'back'
  ) => {
    e.preventDefault();
    setIsDragging(null);

    const droppedFile =
      e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(side, droppedFile);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!files.front) {
      setError(
        'Please upload required document'
      );
      return;
    }

    if (
      requiresBack &&
      !files.back
    ) {
      setError(
        'Back side is required'
      );
      return;
    }

    try {
      setIsLoading(true);

      const formData =
        new FormData();

      formData.append(
        'document_type',
        documentType
      );

      if (files.front) {
        formData.append(
          'front_document',
          files.front
        );
      }

      if (
        requiresBack &&
        files.back
      ) {
        formData.append(
          'back_document',
          files.back
        );
      }

      // API Call
      // await uploadCandidateVerification(formData);

      console.log(
        'Verification payload:',
        formData
      );
    } catch (err) {
      setError(
        'Failed to upload verification'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreview = (
    file: File | null
  ) => {
    if (!file) return null;

    if (
      file.type ===
      'application/pdf'
    ) {
      return (
        <div className="flex flex-col items-center gap-2 text-gray-300">
          <FileText size={34} />
          <p className="text-xs">
            {file.name}
          </p>
        </div>
      );
    }

    return (
      <img
        src={URL.createObjectURL(
          file
        )}
        alt="preview"
        className="h-full w-full object-cover rounded-xl"
      />
    );
  };

  const UploadBox = ({
    side,
    title,
  }: {
    side: 'front' | 'back';
    title: string;
  }) => (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(side);
      }}
      onDragLeave={() =>
        setIsDragging(null)
      }
      onDrop={(e) =>
        handleDrop(e, side)
      }
      className={`relative h-52 rounded-2xl border border-dashed cursor-pointer overflow-hidden transition-all duration-200 ${
        isDragging === side
          ? 'border-blue-400 bg-blue-500/10'
          : 'border-white/15 bg-white/5'
      }`}
    >
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        onChange={(e) => {
          const file =
            e.target.files?.[0];
          if (file) {
            handleFile(
              side,
              file
            );
          }
        }}
      />

      <div className="h-full flex items-center justify-center p-4">
        {files[side] ? (
          renderPreview(
            files[side]
          )
        ) : (
          <div className="text-center text-gray-400 space-y-3">
            <Upload
              size={30}
              className="mx-auto"
            />
            <div>
              <p className="text-sm font-medium text-white">
                {title}
              </p>
              <p className="text-xs mt-1">
                Click to upload or drag
              </p>
              <p className="text-xs">
                JPG / PNG / PDF
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#06142d] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] text-blue-300 uppercase">
            Candidate Verification
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Verify Your Identity
          </h1>

          <p className="text-gray-400 mt-3 text-sm">
            To maintain trust and
            security, upload a
            valid identity document.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2 text-gray-400">
            <span>Step 2 of 3</span>
            <span>
              66% Complete
            </span>
          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: '66%',
              }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
        </div>

        {/* Doc Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            {
              key: 'PASSPORT',
              label: 'Passport',
              icon: Shield,
            },
            {
              key: 'PAN_CARD',
              label: 'PAN Card',
              icon: CreditCard,
            },
            {
              key: 'NATIONAL_ID',
              label: 'National ID',
              icon: IdCard,
            },
            {
              key: 'DRIVERS_LICENSE',
              label:
                "Driver's License",
              icon: CheckCircle,
            },
          ].map((doc) => {
            const Icon =
              doc.icon;

            return (
              <button
                key={doc.key}
                onClick={() => {
                  setDocumentType(
                    doc.key as DocumentType
                  );

                  setFiles({
                    front: null,
                    back: null,
                  });

                  setError('');
                }}
                className={`rounded-xl px-4 py-4 border transition-all flex flex-col items-center gap-2 ${
                  documentType ===
                  doc.key
                    ? 'bg-gradient-to-r from-blue-800 to-purple-700 border-transparent'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">
                  {doc.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Uploads */}
        <div
          className={`grid gap-5 mb-8 ${
            requiresBack
              ? 'md:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          <UploadBox
            side="front"
            title={
              requiresBack
                ? 'Front of Document'
                : 'Upload Document'
            }
          />

          {requiresBack && (
            <UploadBox
              side="back"
              title="Back of Document"
            />
          )}
        </div>

        {/* Requirements */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-8">
          <h3 className="font-semibold mb-4">
            Photo Requirements
          </h3>

          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex gap-2">
              <CheckCircle
                size={16}
              />
              Clear image
            </div>

            <div className="flex gap-2">
              <Zap size={16} />
              Entire ID visible
            </div>

            <div className="flex gap-2">
              <AlertCircle
                size={16}
              />
              No blur / glare
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-500/20 border border-red-400 text-red-300 p-3 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={isLoading}
          onClick={
            handleSubmit
          }
          className="w-full md:w-auto px-10 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50"
        >
          {isLoading
            ? 'Uploading...'
            : 'Submit for Verification'}
        </motion.button>
      </div>
    </div>
  );
}
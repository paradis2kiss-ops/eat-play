/**
 * 환경변수 검증 및 관리 유틸리티
 */

interface EnvConfig {
  GEMINI_API_KEY: string;
  API_URL?: string;
  APP_ENV: 'development' | 'production' | 'test';
}

class EnvValidator {
  private static instance: EnvValidator;
  private config: EnvConfig | null = null;

  private constructor() {}

  static getInstance(): EnvValidator {
    if (!EnvValidator.instance) {
      EnvValidator.instance = new EnvValidator();
    }
    return EnvValidator.instance;
  }

  /**
   * 환경변수 검증 및 로드
   */
  validate(): EnvConfig {
    if (this.config) {
      return this.config;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        '⚠️ Gemini API 키가 설정되지 않았습니다.\n\n' +
        '다음 단계를 따라주세요:\n' +
        '1. 프로젝트 루트에 .env 파일을 생성하세요\n' +
        '2. 파일에 다음 내용을 추가하세요:\n' +
        '   VITE_GEMINI_API_KEY=your_api_key_here\n\n' +
        '3. API 키는 https://makersuite.google.com/app/apikey 에서 발급받을 수 있습니다.\n' +
        '4. 개발 서버를 재시작하세요 (npm run dev)'
      );
    }

    if (apiKey === 'your_gemini_api_key_here' || apiKey === 'PLACEHOLDER_API_KEY') {
      throw new Error(
        '⚠️ API 키를 실제 키로 교체해주세요.\n\n' +
        '.env 파일의 VITE_GEMINI_API_KEY 값을 확인하세요.'
      );
    }

    if (apiKey.length < 20) {
      console.warn('⚠️ API 키가 너무 짧습니다. 올바른 키인지 확인해주세요.');
    }

    const appEnv = (import.meta.env.VITE_APP_ENV || 'development') as EnvConfig['APP_ENV'];
    
    this.config = {
      GEMINI_API_KEY: apiKey,
      API_URL: import.meta.env.VITE_API_URL,
      APP_ENV: appEnv,
    };

    // 개발 환경에서 설정 확인
    if (appEnv === 'development') {
      console.log('✅ 환경변수 로드 성공');
      console.log('📍 환경:', appEnv);
      console.log('🔑 API 키:', `${apiKey.substring(0, 10)}...`);
    }

    return this.config;
  }

  /**
   * 설정된 환경변수 가져오기
   */
  getConfig(): EnvConfig {
    if (!this.config) {
      return this.validate();
    }
    return this.config;
  }

  /**
   * API 키 가져오기
   */
  getApiKey(): string {
    return this.getConfig().GEMINI_API_KEY;
  }

  /**
   * 프로덕션 환경 여부 확인
   */
  isProduction(): boolean {
    return this.getConfig().APP_ENV === 'production';
  }

  /**
   * 개발 환경 여부 확인
   */
  isDevelopment(): boolean {
    return this.getConfig().APP_ENV === 'development';
  }
}

export const envValidator = EnvValidator.getInstance();

// 앱 시작 시 환경변수 검증
try {
  envValidator.validate();
} catch (error) {
  console.error('환경변수 검증 실패:', error);
  // 에러는 앱 실행 시점에 다시 throw됨
}

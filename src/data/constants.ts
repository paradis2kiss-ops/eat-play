
import type { Recipe, DiseaseCategory } from '@/types';

export const DISEASE_CATEGORIES: DiseaseCategory[] = [
  {
    name: "대사질환",
    icon: "🩺",
    diseases: [
      { id: "diabetes", name: "당뇨", icon: "💉" },
      {
        id: "blood-pressure",
        name: "혈압질환",
        icon: "💓",
        subOptions: [
          { id: "high", name: "고혈압" },
          { id: "low", name: "저혈압" },
        ],
      },
      { id: "dyslipidemia", name: "이상지질혈증", icon: "🧬" },
    ],
  },
  {
    name: "장기질환",
    icon: "💊",
    diseases: [
      {
        id: "kidney",
        name: "신장질환",
        icon: "⚕",
        subOptions: [
            { id: "general", name: "일반" },
            { id: "pre-dialysis", name: "투석 전 단계" },
        ],
      },
      { id: "heart", name: "심장질환", icon: "❤️" },
      { id: "gastritis", name: "위염/역류성식도염", icon: "⚕️" },
    ],
  },
  {
    name: "호르몬/내분비",
    icon: "⚡",
    diseases: [
      {
        id: "thyroid",
        name: "갑상선 질환",
        icon: "🦋",
        subOptions: [
          { id: "hypo", name: "저하증" },
          { id: "hyper", name: "항진증" },
        ],
      },
      {
        id: "gynecology",
        name: "부인과 질환",
        icon: "🌸",
        subOptions: [
          { id: "pcos", name: "다낭성 난소 증후군" },
          { id: "endometriosis", name: "자궁내막증" },
          { id: "fibroids", name: "자궁근종" },
          { id: "cancer", name: "부인암" },
        ],
      },
    ],
  },
  {
    name: "면역/염증",
    icon: "🛡️",
    diseases: [
      { id: "autoimmune", name: "자가면역질환", icon: "🔬" },
      { id: "gout", name: "통풍", icon: "🦴" },
      { id: "ibs", name: "과민성대장증후군", icon: "🌀" },
    ],
  },
];

export const HEALTH_TIPS: { [key: string]: string[] } = {
  general: [
    "하루 물 8잔(약 2L)을 마시는 습관은 신진대사를 돕고 노폐물 배출에 효과적입니다.",
    "식사 시 채소부터 먼저 섭취하면 혈당 스파이크를 예방하고 포만감을 높일 수 있습니다.",
    "천천히 꼭꼭 씹어 먹는 습관(최소 20번)은 소화를 돕고 과식을 방지합니다.",
    "가공식품보다는 자연 식재료를 활용한 요리가 건강에 훨씬 좋습니다.",
    "식사 후 10분 가볍게 걷기는 소화와 혈당 조절에 큰 도움이 됩니다.",
    "충분한 수면(7-8시간)은 식욕 조절 호르몬의 균형을 유지하는 데 필수적입니다."
  ],
  diabetes: [
    "식사 순서를 '채소 🥗 -> 단백질 🍖 -> 탄수화물 🍚'로 바꿔보세요. 혈당 상승을 늦출 수 있습니다.",
    "과일은 식후 바로 드시기보다 식간에, 주스보다는 생과일 형태로 껍질째 드시는 것이 좋습니다.",
    "흰 쌀밥, 빵 같은 정제 탄수화물보다는 현미, 귀리 등 통곡물을 선택하세요.",
    "규칙적인 식사 시간은 혈당 변동폭을 줄이는 데 가장 중요합니다.",
    "당류가 포함된 음료수 대신 물이나 탄산수, 차를 섭취하세요."
  ],
  "blood-pressure-high": [
    "국물 요리는 건더기 위주로 드시고, 국물 섭취를 줄이면 나트륨 섭취를 크게 줄일 수 있습니다.",
    "칼륨이 풍부한 바나나, 토마토, 시금치는 나트륨 배출을 돕습니다.",
    "가공육(햄, 소시지) 섭취를 줄이고 신선한 고기나 생선을 선택하세요.",
    "음식 간을 할 때 소금 대신 식초, 레몬, 마늘, 허브로 맛을 내보세요.",
    "하루 30분 이상의 유산소 운동은 혈압을 낮추는 데 도움이 됩니다."
  ],
  "blood-pressure-low": [
    "하루 2L 이상의 충분한 수분 섭취가 혈액 순환에 중요합니다.",
    "식사를 소량씩 자주(하루 4-5회) 나누어 드시면 식후 저혈압 예방에 좋습니다.",
    "적당량의 소금 섭취가 필요할 수 있으니 무조건적인 저염식은 피하세요.",
    "단백질(달걀, 고기, 콩)과 비타민 B군을 충분히 섭취하여 에너지를 유지하세요.",
    "일어날 때는 천천히 움직여 기립성 저혈압을 예방하세요."
  ],
  dyslipidemia: [
    "포화지방(삼겹살, 버터) 대신 불포화지방(생선, 견과류, 올리브유)을 섭취하세요.",
    "식이섬유가 풍부한 채소와 해조류는 콜레스테롤 배출을 돕습니다.",
    "튀긴 음식보다는 찌거나 구운 조리법을 선택하세요.",
    "하루 한 줌의 견과류는 혈관 건강에 좋은 간식입니다.",
    "과도한 탄수화물 섭취는 중성지방을 높일 수 있으니 주의하세요."
  ],
  "kidney-general": [
    "나트륨 섭취를 줄이는 것이 신장 부담을 줄이는 첫걸음입니다.",
    "단백질은 적정량을 섭취하고, 과도한 고단백 식사는 피하세요.",
    "가공식품의 인산염은 신장에 좋지 않으니 자연 식품을 드세요.",
    "수분 섭취량은 주치의와 상담하여 본인 상태에 맞게 조절해야 합니다.",
    "칼륨 수치가 높다면 채소를 물에 담가두거나 데쳐서 드세요."
  ],
  "kidney-pre-dialysis": [
    "단백질 섭취를 조금 제한하여 신장의 여과 부담을 줄이세요.",
    "채소와 과일의 칼륨 함량을 확인하고 섭취량을 조절하세요.",
    "잡곡밥보다는 칼륨과 인이 적은 흰 쌀밥이 더 나을 수 있습니다.",
    "염분 섭취를 철저히 관리하여 부종과 혈압을 조절하세요.",
    "식사량이 줄어들지 않도록 충분한 열량(탄수화물, 지방) 섭취에 신경 쓰세요."
  ],
  heart: [
    "등푸른 생선(고등어, 연어)의 오메가-3는 심장 건강에 필수적입니다.",
    "트랜스지방(마가린, 과자) 섭취를 최소화하세요.",
    "다양한 색깔의 채소와 과일은 항산화 성분이 풍부해 혈관을 보호합니다.",
    "통곡물 위주의 식단은 심혈관 질환 위험을 낮춥니다.",
    "알코올 섭취를 줄이고 금연하는 것이 심장을 지키는 길입니다."
  ],
  gastritis: [
    "너무 뜨겁거나 차가운 음식, 매운 음식 등 자극적인 음식은 피하세요.",
    "식사는 규칙적으로 하고, 잠들기 3시간 전에는 음식 섭취를 삼가세요.",
    "양배추, 브로콜리 등 비타민 U가 풍부한 식품은 위 점막 보호에 좋습니다.",
    "음식을 천천히 오래 씹어 위장의 소화 부담을 덜어주세요.",
    "카페인과 탄산음료는 위산 분비를 촉진하므로 줄이시는 게 좋습니다."
  ],
  "thyroid-hypo": [
    "요오드가 풍부한 해조류(김, 미역)를 적절히 섭취하세요.",
    "셀레늄이 풍부한 브라질너트나 달걀은 갑상선 기능에 도움을 줍니다.",
    "변비 예방을 위해 식이섬유와 수분을 충분히 섭취하세요.",
    "규칙적인 운동으로 신진대사를 높이세요.",
    "체중 증가를 막기 위해 고칼로리 간식을 피하세요."
  ],
  "thyroid-hyper": [
    "체중 감소를 막기 위해 고단백, 고열량 식사가 필요할 수 있습니다.",
    "요오드가 많은 해조류 섭취를 제한해야 할 수 있습니다.",
    "카페인은 가슴 두근거림을 악화시킬 수 있으니 피하세요.",
    "뼈 건강을 위해 칼슘과 비타민 D를 충분히 섭취하세요.",
    "과도한 땀 배출로 인한 수분 손실을 막기 위해 물을 자주 드세요."
  ],
  "gynecology-pcos": [
    "혈당 지수(GI)가 낮은 통곡물과 채소 위주의 식단을 구성하세요.",
    "아침 식사를 든든히 먹으면 인슐린 저항성 개선에 도움이 됩니다.",
    "가공된 탄수화물과 설탕 섭취를 줄이는 것이 가장 중요합니다.",
    "항염 효과가 있는 오메가-3 지방산을 충분히 섭취하세요.",
    "규칙적인 식사로 폭식을 예방하세요."
  ],
  "gynecology-endometriosis": [
    "염증을 줄이는 항염 식단(생선, 채소, 과일, 견과류)을 실천하세요.",
    "붉은 고기(소고기, 돼지고기) 섭취를 줄이고 식물성 단백질을 늘리세요.",
    "글루텐 섭취를 줄이면 복부 불편감이 완화될 수 있습니다.",
    "환경 호르몬 노출을 줄이기 위해 플라스틱 용기 사용을 자제하세요.",
    "생강이나 강황 같은 항염 향신료를 요리에 활용해보세요."
  ],
  "gynecology-fibroids": [
    "녹색 잎채소와 십자화과 채소(브로콜리)를 충분히 섭취하세요.",
    "비타민 D 수치를 유지하는 것이 자궁 건강에 도움이 됩니다.",
    "알코올과 카페인은 에스트로겐 수치에 영향을 줄 수 있으니 조절하세요.",
    "유제품 섭취가 자궁근종 위험을 낮춘다는 연구 결과가 있습니다.",
    "고지방 식사는 피하고 적정 체중을 유지하세요."
  ],
  "gynecology-cancer": [
    "항산화 성분이 풍부한 다양한 색의 채소와 과일을 매끼 드세요.",
    "충분한 단백질 섭취는 체력 유지와 회복에 필수적입니다.",
    "익히지 않은 날음식(회, 육회) 섭취는 감염 위험이 있으니 주의하세요.",
    "소화가 잘 되는 부드러운 음식을 드시는 것이 좋습니다.",
    "입맛이 없을 때는 소량씩 자주 드시거나 영양 보충 음료를 활용하세요."
  ],
  autoimmune: [
    "장 건강을 위해 발효 식품(김치, 요거트)을 드세요. (단, 과민성 대장 제외)",
    "염증을 유발할 수 있는 설탕, 가공식품, 트랜스지방을 피하세요.",
    "비타민 D와 오메가-3는 면역계 균형에 도움을 줍니다.",
    "개인적으로 증상을 악화시키는 음식(트리거 푸드)을 찾아 배제하세요.",
    "강황, 생강, 마늘 등 천연 항염 식재료를 적극 활용하세요."
  ],
  gout: [
    "퓨린 함량이 높은 맥주, 내장류, 등푸른 생선 섭취를 피하세요.",
    "충분한 수분 섭취는 요산 배출에 매우 중요합니다.",
    "과당이 많은 음료나 간식은 요산 수치를 높일 수 있습니다.",
    "체리나 베리류는 통풍 발작 빈도를 낮추는 데 도움이 될 수 있습니다.",
    "급격한 다이어트는 오히려 요산 수치를 높일 수 있으니 서서히 감량하세요."
  ],
  ibs: [
    "포드맵(FODMAP)이 높은 음식(생마늘, 양파, 밀가루 등)을 주의하세요.",
    "식사 일기를 작성하여 본인에게 가스를 유발하는 음식을 찾으세요.",
    "기름진 음식과 카페인은 장을 자극할 수 있습니다.",
    "수용성 식이섬유(오트밀, 귤 등)가 변비형 과민성 대장에 좋습니다.",
    "스트레스를 줄이고 식사 시간을 여유롭게 가지세요."
  ]
};

export const RECIPE_DATABASE: { [key: string]: Recipe[] } = {
    diabetes: [
        {
            name: "귀리 그릭요거트 볼",
            icon: "🥣",
            tags: ["저당", "고단백", "아침"],
            description: "혈당 관리에 좋은 귀리와 그릭요거트로 만든 영양 가득한 아침 식사",
            ingredients: ["귀리 50g", "그릭요거트 200g", "블루베리 한줌", "아몬드 10알"],
            calories: 320,
            protein: 18,
            carbs: 42,
            fat: 8,
            fiber: 8,
            sugar: 5,
            sodium: 40,
            potassium: 300,
            calcium: 150,
            steps: [
                "귀리를 물이나 우유에 5분간 불려주세요",
                "그릭요거트를 볼에 담아주세요",
                "불린 귀리를 요거트 위에 올려주세요",
                "블루베리와 아몬드를 토핑으로 올려 완성합니다"
            ]
        },
        { name: "닭가슴살 샐러드", icon: "🥗", tags: ["저당", "고단백", "점심"], description: "신선한 채소와 구운 닭가슴살로 만든 건강한 샐러드", ingredients: ["닭가슴살", "로메인", "방울토마토", "오이"], calories: 280, protein: 35, carbs: 12, fat: 10, fiber: 5, sodium: 300, potassium: 450 },
        { name: "연어 아보카도 샐러드", icon: "🐟", tags: ["오메가3", "저당", "점심"], description: "오메가3가 풍부한 연어와 아보카도의 조합", ingredients: ["연어", "아보카도", "시금치", "레몬"], calories: 380, protein: 28, carbs: 15, fat: 24, fiber: 7, sugar: 2, cholesterol: 45 },
        { name: "두부 스테이크", icon: "🍽️", tags: ["식물성단백", "저당", "저녁"], description: "고단백 저칼로리 두부로 만든 든든한 식사", ingredients: ["두부", "브로콜리", "파프리카", "마늘"], calories: 220, protein: 20, carbs: 10, fat: 12, calcium: 200, iron: 4, sodium: 150 },
        { name: "병아리콩 샐러드", icon: "🥙", tags: ["식이섬유", "저당", "점심"], description: "식이섬유가 풍부한 병아리콩 샐러드", ingredients: ["병아리콩", "파프리카", "양파", "올리브오일"], calories: 260, protein: 12, carbs: 35, fat: 8, fiber: 10, potassium: 300 }
    ],
    "blood-pressure-high": [
        { name: "시금치 두부국", icon: "🍲", tags: ["저염", "칼륨", "국물"], description: "칼륨이 풍부한 시금치와 담백한 두부로 만든 국", ingredients: ["시금치", "두부", "대파", "마늘"], calories: 150, protein: 12, carbs: 8, fat: 7, sodium: 200, potassium: 600, calcium: 120, iron: 3.5 },
        { name: "바나나 아몬드 스무디", icon: "🍌", tags: ["칼륨", "무가당", "간식"], description: "혈압 조절에 도움이 되는 칼륨 가득한 스무디", ingredients: ["바나나", "아몬드우유", "시금치", "아몬드"], calories: 200, protein: 6, carbs: 35, fat: 5, potassium: 800, magnesium: 40 },
        { name: "구운 고구마", icon: "🍠", tags: ["칼륨", "식이섬유", "간식"], description: "혈압 관리에 좋은 칼륨이 풍부한 고구마", ingredients: ["고구마"], calories: 180, protein: 3, carbs: 42, fat: 0.5, potassium: 540, fiber: 4, sodium: 10 },
        { name: "아보카도 토스트", icon: "🥑", tags: ["저염", "칼륨", "아침"], description: "건강한 지방과 칼륨이 풍부한 아침 메뉴", ingredients: ["통밀빵", "아보카도", "방울토마토", "후추"], calories: 280, protein: 8, carbs: 30, fat: 16, potassium: 700, fiber: 9, sodium: 150 },
        { name: "비트 샐러드", icon: "🥗", tags: ["저염", "항산화", "점심"], description: "혈압 조절에 도움이 되는 비트 샐러드", ingredients: ["비트", "호두", "염소치즈", "루꼴라"], calories: 220, protein: 8, carbs: 20, fat: 12, sodium: 180, potassium: 400 }
    ],
    "blood-pressure-low": [
        { name: "소고기 미역국", icon: "🍖", tags: ["철분", "단백질", "국물"], description: "철분과 단백질이 풍부한 영양 국물", ingredients: ["소고기", "미역", "다진마늘", "참기름"], calories: 320, protein: 25, carbs: 12, fat: 18, iron: 4.5, sodium: 600 },
        { name: "치즈 달걀 샌드위치", icon: "🥪", tags: ["단백질", "철분", "아침"], description: "영양가 높은 단백질로 시작하는 하루", ingredients: ["통밀빵", "달걀", "체다치즈", "시금치"], calories: 380, protein: 22, carbs: 32, fat: 18, calcium: 300, iron: 3 },
        { name: "견과류 그래놀라", icon: "🥜", tags: ["철분", "에너지", "아침"], description: "에너지를 높여주는 견과류 그래놀라", ingredients: ["귀리", "호두", "아몬드", "건포도"], calories: 340, protein: 10, carbs: 42, fat: 15, iron: 2.5, fiber: 6 },
        { name: "시금치 오믈렛", icon: "🍳", tags: ["철분", "단백질", "아침"], description: "철분이 풍부한 시금치 오믈렛", ingredients: ["달걀", "시금치", "체다치즈", "우유"], calories: 280, protein: 20, carbs: 8, fat: 18, iron: 3.2, calcium: 150 },
        { name: "렌틸콩 수프", icon: "🍜", tags: ["철분", "단백질", "저녁"], description: "영양 가득한 렌틸콩 수프", ingredients: ["렌틸콩", "당근", "셀러리", "양파"], calories: 240, protein: 16, carbs: 38, fat: 3, iron: 5, fiber: 12 }
    ],
    "kidney-general": [
        { name: "오이 샐러드", icon: "🥒", tags: ["저칼륨", "저인", "반찬"], description: "신장에 부담 없는 상큼한 오이 샐러드", ingredients: ["오이", "양파", "식초", "설탕"], calories: 45, protein: 1, carbs: 10, fat: 0.5, potassium: 150, sodium: 50 },
        { name: "백미밥과 양배추", icon: "🍚", tags: ["저칼륨", "저인", "주식"], description: "신장 건강을 위한 기본 식사", ingredients: ["백미", "양배추", "당근", "올리브오일"], calories: 280, protein: 6, carbs: 58, fat: 3, potassium: 200, phosphorus: 80 },
        { name: "사과 샐러드", icon: "🍎", tags: ["저칼륨", "항산화", "간식"], description: "신장에 좋은 사과로 만든 샐러드", ingredients: ["사과", "양상추", "호두", "레몬즙"], calories: 160, protein: 3, carbs: 28, fat: 5, potassium: 120 },
        { name: "닭가슴살 볶음", icon: "🍗", tags: ["저인", "단백질", "저녁"], description: "적절한 단백질 공급을 위한 닭가슴살 요리", ingredients: ["닭가슴살", "양배추", "양파", "올리브오일"], calories: 240, protein: 32, carbs: 8, fat: 9, potassium: 350 },
        { name: "배추된장국", icon: "🥬", tags: ["저칼륨", "국물", "점심"], description: "담백한 배추된장국", ingredients: ["배추", "된장", "두부", "대파"], calories: 120, protein: 8, carbs: 12, fat: 4, sodium: 400 }
    ],
    "kidney-pre-dialysis": [
        { name: "저단백 채소볶음", icon: "🥬", tags: ["저단백", "저인", "저녁"], description: "투석 전 단계에 적합한 저단백 식단", ingredients: ["양배추", "당근", "애호박", "올리브오일"], calories: 120, protein: 3, carbs: 20, fat: 4, potassium: 250 },
        { name: "백미죽", icon: "🍚", tags: ["저단백", "소화용이", "아침"], description: "부담 없는 아침 식사", ingredients: ["백미", "물", "소금"], calories: 150, protein: 3, carbs: 33, fat: 0.5, sodium: 100 },
        { name: "오이 무침", icon: "🥒", tags: ["저칼륨", "저인", "반찬"], description: "수분 보충에 좋은 오이", ingredients: ["오이", "식초", "설탕", "참기름"], calories: 50, protein: 1, carbs: 8, fat: 2, potassium: 140 },
        { name: "사과 샐러드", icon: "🍎", tags: ["저칼륨", "비타민", "간식"], description: "신장에 부담 없는 과일", ingredients: ["사과", "양상추", "레몬즙"], calories: 80, protein: 1, carbs: 18, fat: 0.5, potassium: 100 },
        { name: "감자 삶은것", icon: "🥔", tags: ["저인", "에너지", "간식"], description: "칼륨을 줄인 감자 (물에 불림)", ingredients: ["감자 (물에 불림)", "소금"], calories: 110, protein: 2, carbs: 26, fat: 0, potassium: 200 }
    ],
    heart: [
        { name: "연어구이", icon: "🐟", tags: ["오메가3", "심장건강", "저녁"], description: "심장에 좋은 오메가3가 풍부한 연어", ingredients: ["연어", "레몬", "딜", "올리브오일"], calories: 340, protein: 34, carbs: 0, fat: 22, sodium: 60, cholesterol: 50 },
        { name: "호두 샐러드", icon: "🥗", tags: ["오메가3", "항산화", "점심"], description: "심장 건강에 도움이 되는 호두 샐러드", ingredients: ["호두", "시금치", "딸기", "발사믹"], calories: 280, protein: 8, carbs: 22, fat: 18, fiber: 6, sodium: 150 },
        { name: "귀리 죽", icon: "🥣", tags: ["식이섬유", "심장건강", "아침"], description: "콜레스테롤 관리에 좋은 귀리죽", ingredients: ["귀리", "아몬드우유", "블루베리", "꿀"], calories: 240, protein: 8, carbs: 42, fat: 5, fiber: 8, cholesterol: 0 },
        { name: "브로콜리 마늘볶음", icon: "🥦", tags: ["항산화", "식이섬유", "반찬"], description: "심장에 좋은 브로콜리 요리", ingredients: ["브로콜리", "마늘", "올리브오일", "레몬"], calories: 120, protein: 4, carbs: 12, fat: 7, fiber: 5 },
        { name: "고등어구이", icon: "🐟", tags: ["오메가3", "단백질", "저녁"], description: "DHA가 풍부한 고등어구이", ingredients: ["고등어", "무", "레몬", "소금"], calories: 320, protein: 28, carbs: 2, fat: 22, cholesterol: 60, sodium: 250 }
    ],
    dyslipidemia: [
        { name: "귀리 오트밀", icon: "🥣", tags: ["저포화지방", "식이섬유", "아침"], description: "콜레스테롤 수치를 낮추는 귀리", ingredients: ["귀리", "저지방우유", "블루베리", "아몬드"], calories: 260, protein: 10, carbs: 45, fat: 5, fiber: 9, cholesterol: 2 },
        { name: "아보카도 샐러드", icon: "🥑", tags: ["불포화지방", "식이섬유", "점심"], description: "좋은 지방이 가득한 아보카도", ingredients: ["아보카도", "토마토", "양상추", "올리브오일"], calories: 280, protein: 5, carbs: 20, fat: 20, fiber: 8, cholesterol: 0 },
        { name: "등푸른 생선구이", icon: "🐟", tags: ["오메가3", "저포화지방", "저녁"], description: "HDL 콜레스테롤을 높이는 등푸른 생선", ingredients: ["고등어", "레몬", "마늘", "로즈마리"], calories: 320, protein: 30, carbs: 2, fat: 21, cholesterol: 55 },
        { name: "견과류 믹스", icon: "🥜", tags: ["불포화지방", "항산화", "간식"], description: "심혈관 건강을 돕는 견과류", ingredients: ["아몬드", "호두", "캐슈넛", "건포도"], calories: 200, protein: 6, carbs: 15, fat: 14, fiber: 4, cholesterol: 0 },
        { name: "렌틸콩 스튜", icon: "🍲", tags: ["식이섬유", "식물성단백", "저녁"], description: "콜레스테롤 조절에 도움이 되는 렌틸콩", ingredients: ["렌틸콩", "토마토", "양파", "당근"], calories: 240, protein: 14, carbs: 40, fat: 2, fiber: 15, cholesterol: 0 }
    ],
    autoimmune: [
        { name: "연어 아보카도 볼", icon: "🐟", tags: ["항염", "오메가3", "점심"], description: "염증을 줄이는 오메가3 가득", ingredients: ["연어", "아보카도", "퀴노아", "시금치"], calories: 380, protein: 28, carbs: 30, fat: 18 },
        { name: "강황 생강차", icon: "🍵", tags: ["항염", "항산화", "음료"], description: "자가면역 질환에 도움이 되는 강황", ingredients: ["강황", "생강", "꿀", "레몬"], calories: 40, protein: 0, carbs: 10, fat: 0 },
        { name: "블루베리 스무디", icon: "🫐", tags: ["항산화", "항염", "간식"], description: "항산화 성분이 풍부한 블루베리", ingredients: ["블루베리", "시금치", "바나나", "아몬드우유"], calories: 180, protein: 4, carbs: 35, fat: 3 },
        { name: "브로콜리 퀴노아 볼", icon: "🥗", tags: ["항염", "식이섬유", "점심"], description: "염증 감소에 도움이 되는 채소 볼", ingredients: ["브로콜리", "퀴노아", "병아리콩", "올리브오일"], calories: 300, protein: 12, carbs: 42, fat: 10 },
        { name: "골든밀크", icon: "🥛", tags: ["항염", "면역", "음료"], description: "면역력 강화에 좋은 강황 우유", ingredients: ["아몬드우유", "강황", "계피", "꿀"], calories: 120, protein: 2, carbs: 18, fat: 4 }
    ],
    "gynecology-pcos": [
        { name: "퀴노아 샐러드", icon: "🥗", tags: ["저GI", "식이섬유", "점심"], description: "혈당 조절에 도움이 되는 퀴노아", ingredients: ["퀴노아", "방울토마토", "오이", "페타치즈"], calories: 280, protein: 10, carbs: 38, fat: 10, fiber: 6 },
        { name: "연어 아스파라거스", icon: "🐟", tags: ["오메가3", "항염", "저녁"], description: "호르몬 균형에 도움이 되는 연어", ingredients: ["연어", "아스파라거스", "레몬", "올리브오일"], calories: 340, protein: 32, carbs: 8, fat: 20 },
        { name: "시나몬 오트밀", icon: "🥣", tags: ["저GI", "항염", "아침"], description: "인슐린 저항성 개선에 도움", ingredients: ["귀리", "시나몬", "호두", "블루베리"], calories: 260, protein: 8, carbs: 42, fat: 8, fiber: 7 },
        { name: "병아리콩 카레", icon: "🍛", tags: ["식물성단백", "저GI", "저녁"], description: "PCOS 관리에 좋은 병아리콩", ingredients: ["병아리콩", "시금치", "토마토", "강황"], calories: 300, protein: 14, carbs: 45, fat: 8 },
        { name: "녹차 스무디", icon: "🍵", tags: ["항산화", "대사촉진", "간식"], description: "대사 개선에 도움이 되는 녹차", ingredients: ["녹차", "바나나", "시금치", "아몬드우유"], calories: 150, protein: 4, carbs: 28, fat: 3 }
    ],
    "gynecology-endometriosis": [
        { name: "항염 샐러드", icon: "🥗", tags: ["항염", "오메가3", "점심"], description: "염증 감소에 도움이 되는 샐러드", ingredients: ["케일", "연어", "호두", "석류"], calories: 320, protein: 24, carbs: 18, fat: 18 },
        { name: "강황 렌틸수프", icon: "🍲", tags: ["항염", "식이섬유", "저녁"], description: "자궁내막증 증상 완화에 도움", ingredients: ["렌틸콩", "강황", "생강", "당근"], calories: 240, protein: 14, carbs: 38, fat: 3 },
        { name: "블루베리 요거트", icon: "🫐", tags: ["항산화", "프로바이오틱스", "아침"], description: "항산화 성분이 풍부한 간단한 아침", ingredients: ["그릭요거트", "블루베리", "아마씨", "꿀"], calories: 220, protein: 15, carbs: 30, fat: 5 },
        { name: "생강차", icon: "🍵", tags: ["항염", "진통", "음료"], description: "통증 완화에 도움이 되는 생강차", ingredients: ["생강", "레몬", "꿀", "민트"], calories: 35, protein: 0, carbs: 9, fat: 0 },
        { name: "브로콜리 두부볶음", icon: "🥦", tags: ["항염", "식물성단백", "저녁"], description: "에스트로겐 균형에 도움", ingredients: ["브로콜리", "두부", "마늘", "참기름"], calories: 200, protein: 16, carbs: 12, fat: 10 }
    ],
    "gynecology-fibroids": [
        { name: "케일 샐러드", icon: "🥬", tags: ["식이섬유", "비타민K", "점심"], description: "호르몬 균형에 도움이 되는 케일", ingredients: ["케일", "병아리콩", "아보카도", "레몬"], calories: 280, protein: 12, carbs: 32, fat: 12, fiber: 8, iron: 3 },
        { name: "두부 스테이크", icon: "🍽️", tags: ["식물성단백", "저지방", "저녁"], description: "자궁근종 관리에 좋은 두부", ingredients: ["두부", "브로콜리", "당근", "올리브오일"], calories: 220, protein: 20, carbs: 14, fat: 10 },
        { name: "아마씨 스무디", icon: "🥤", tags: ["오메가3", "식이섬유", "아침"], description: "호르몬 대사에 도움이 되는 아마씨", ingredients: ["아마씨", "바나나", "시금치", "아몬드우유"], calories: 180, protein: 6, carbs: 28, fat: 6 },
        { name: "현미밥 비빔밥", icon: "🍚", tags: ["식이섬유", "저GI", "점심"], description: "균형잡힌 영양의 현미 비빔밥", ingredients: ["현미", "나물", "달걀", "고추장"], calories: 380, protein: 14, carbs: 60, fat: 10 },
        { name: "십자화과 채소볶음", icon: "🥦", tags: ["해독", "식이섬유", "반찬"], description: "에스트로겐 대사에 도움", ingredients: ["브로콜리", "양배추", "콜리플라워", "마늘"], calories: 120, protein: 5, carbs: 15, fat: 5 }
    ],
    "gynecology-cancer": [
        { name: "항암 채소 수프", icon: "🍲", tags: ["항산화", "면역", "저녁"], description: "면역력 강화를 위한 영양 수프", ingredients: ["브로콜리", "당근", "셀러리", "토마토"], calories: 160, protein: 6, carbs: 28, fat: 3 },
        { name: "연어 아보카도 샐러드", icon: "🐟", tags: ["오메가3", "항산화", "점심"], description: "회복에 필요한 영양이 가득", ingredients: ["연어", "아보카도", "케일", "호두"], calories: 380, protein: 30, carbs: 15, fat: 24 },
        { name: "베리 스무디 볼", icon: "🫐", tags: ["항산화", "비타민", "아침"], description: "항산화 성분이 풍부한 베리", ingredients: ["블루베리", "딸기", "그릭요거트", "아몬드"], calories: 260, protein: 12, carbs: 38, fat: 8 },
        { name: "현미 퀴노아 볼", icon: "🥗", tags: ["식이섬유", "단백질", "점심"], description: "균형잡힌 영양의 곡물 볼", ingredients: ["현미", "퀴노아", "병아리콩", "시금치"], calories: 320, protein: 14, carbs: 52, fat: 6 },
        { name: "녹색 채소 주스", icon: "🥤", tags: ["해독", "비타민", "음료"], description: "해독과 면역력 강화에 도움", ingredients: ["케일", "셀러리", "오이", "사과"], calories: 80, protein: 2, carbs: 18, fat: 0 }
    ],
    "thyroid-hypo": [
        { name: "해조류 샐러드", icon: "🌊", tags: ["요오드", "저칼로리", "점심"], description: "갑상선 기능 저하증에 좋은 요오드 공급", ingredients: ["미역", "다시마", "오이", "참기름"], calories: 80, protein: 3, carbs: 12, fat: 3 },
        { name: "연어구이", icon: "🐟", tags: ["셀레늄", "오메가3", "저녁"], description: "갑상선 호르몬 생성에 도움", ingredients: ["연어", "레몬", "마늘", "올리브오일"], calories: 320, protein: 32, carbs: 2, fat: 20 },
        { name: "현미밥", icon: "🍚", tags: ["식이섬유", "에너지", "주식"], description: "대사 촉진에 도움이 되는 현미", ingredients: ["현미"], calories: 220, protein: 5, carbs: 46, fat: 2 },
        { name: "브라질너트 스낵", icon: "🥜", tags: ["셀레늄", "에너지", "간식"], description: "셀레늄이 풍부한 간식", ingredients: ["브라질너트", "아몬드", "호두"], calories: 180, protein: 5, carbs: 8, fat: 16 },
        { name: "시금치 달걀볶음", icon: "🍳", tags: ["철분", "단백질", "아침"], description: "영양 가득한 아침 식사", ingredients: ["시금치", "달걀", "마늘", "올리브오일"], calories: 180, protein: 14, carbs: 6, fat: 12 }
    ],
    "thyroid-hyper": [
        { name: "십자화과 채소 샐러드", icon: "🥦", tags: ["갑상선억제", "항산화", "점심"], description: "갑상선 항진증 관리에 도움", ingredients: ["브로콜리", "케일", "양배추", "올리브오일"], calories: 100, protein: 4, carbs: 12, fat: 5 },
        { name: "닭가슴살 샐러드", icon: "🥗", tags: ["고단백", "저요오드", "점심"], description: "요오드를 제한한 고단백 식사", ingredients: ["닭가슴살", "로메인", "방울토마토", "발사믹"], calories: 220, protein: 32, carbs: 10, fat: 7 },
        { name: "콜리플라워 라이스", icon: "🌾", tags: ["저칼로리", "갑상선억제", "주식"], description: "갑상선 기능 조절에 도움", ingredients: ["콜리플라워", "마늘", "올리브오일"], calories: 80, protein: 3, carbs: 10, fat: 4 },
        { name: "무 샐러드", icon: "🥕", tags: ["갑상선억제", "소화", "반찬"], description: "십자화과 채소로 갑상선 관리", ingredients: ["무", "양파", "식초", "참기름"], calories: 60, protein: 1, carbs: 12, fat: 2 },
        { name: "베리 요거트", icon: "🫐", tags: ["항산화", "프로바이오틱스", "간식"], description: "면역력 강화에 도움", ingredients: ["그릭요거트", "블루베리", "딸기"], calories: 150, protein: 12, carbs: 20, fat: 3 }
    ],
    gastritis: [
        { name: "양배추즙", icon: "🥬", tags: ["위보호", "소화", "음료"], description: "위 점막 보호에 탁월한 양배추즙", ingredients: ["양배추", "물", "꿀"], calories: 50, protein: 2, carbs: 10, fat: 0 },
        { name: "단호박죽", icon: "🎃", tags: ["위보호", "소화용이", "아침"], description: "부드럽고 위에 부담 없는 죽", ingredients: ["단호박", "백미", "물"], calories: 180, protein: 4, carbs: 38, fat: 1 },
        { name: "감자 수프", icon: "🥔", tags: ["위보호", "저자극", "점심"], description: "위산을 중화시키는 감자", ingredients: ["감자", "양파", "우유", "버터"], calories: 200, protein: 5, carbs: 32, fat: 6 },
        { name: "닭가슴살 죽", icon: "🍗", tags: ["고단백", "소화용이", "저녁"], description: "영양과 소화를 모두 챙긴 죽", ingredients: ["닭가슴살", "백미", "애호박", "물"], calories: 220, protein: 18, carbs: 30, fat: 3 },
        { name: "바나나 스무디", icon: "🍌", tags: ["위보호", "저자극", "간식"], description: "위에 부담 없는 부드러운 간식", ingredients: ["바나나", "아몬드우유", "꿀"], calories: 160, protein: 3, carbs: 35, fat: 2 }
    ],
    gout: [
        { name: "체리 스무디", icon: "🍒", tags: ["항염", "요산감소", "간식"], description: "통풍 발작 예방에 도움이 되는 체리", ingredients: ["체리", "바나나", "아몬드우유"], calories: 180, protein: 3, carbs: 40, fat: 2 },
        { name: "현미 채소볶음밥", icon: "🍚", tags: ["저퓨린", "식이섬유", "점심"], description: "통풍에 안전한 식사", ingredients: ["현미", "당근", "양파", "애호박"], calories: 280, protein: 7, carbs: 55, fat: 4 },
        { name: "두부 샐러드", icon: "🥗", tags: ["저퓨린", "식물성단백", "점심"], description: "식물성 단백질로 영양 공급", ingredients: ["두부", "로메인", "토마토", "올리브오일"], calories: 200, protein: 14, carbs: 12, fat: 12 },
        { name: "감자 샐러드", icon: "🥔", tags: ["저퓨린", "에너지", "반찬"], description: "통풍에 안전한 탄수화물", ingredients: ["감자", "당근", "오이", "요거트"], calories: 180, protein: 4, carbs: 32, fat: 4 },
        { name: "레몬수", icon: "🍋", tags: ["요산배출", "수분", "음료"], description: "요산 배출을 돕는 레몬수", ingredients: ["레몬", "물", "꿀"], calories: 40, protein: 0, carbs: 10, fat: 0 }
    ],
    ibs: [
        { name: "민트 차", icon: "🍵", tags: ["소화", "경련완화", "음료"], description: "장 경련 완화에 도움", ingredients: ["페퍼민트", "물", "꿀"], calories: 20, protein: 0, carbs: 5, fat: 0 },
        { name: "백미죽", icon: "🍚", tags: ["저포드맵", "소화용이", "아침"], description: "과민한 장에 부담 없는 죽", ingredients: ["백미", "물", "소금"], calories: 150, protein: 3, carbs: 33, fat: 0.5 },
        { name: "삶은 달걀", icon: "🥚", tags: ["저포드맵", "단백질", "간식"], description: "간단하고 소화 잘 되는 단백질", ingredients: ["달걀"], calories: 140, protein: 12, carbs: 1, fat: 10 },
        { name: "당근 수프", icon: "🥕", tags: ["저포드맵", "소화", "점심"], description: "부드럽고 영양가 있는 수프", ingredients: ["당근", "감자", "생강", "물"], calories: 120, protein: 2, carbs: 25, fat: 2 },
        { name: "바나나", icon: "🍌", tags: ["저포드맵", "칼륨", "간식"], description: "장 건강에 좋은 과일", ingredients: ["바나나"], calories: 105, protein: 1, carbs: 27, fat: 0.5 }
    ]
};

function Group() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <div className="absolute inset-[-2.5%_-2.5%_-1.77%_-1.77%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.7071 41.7071">
          <g id="Group 1">
            <path d="M7.70711 1H40.7071V34" id="Vector 2" stroke="var(--stroke-0, white)" strokeWidth="2" />
            <path d="M40.7071 1L0.707107 41" id="Vector 3" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-black relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <p className="font-['Google_Sans_Flex:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[22px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100, 'GRAD' 0, 'ROND' 0" }}>
            DETAILS OF HACKATHON
          </p>
          <Group />
        </div>
      </div>
    </div>
  );
}

export default function Mo() {
  return (
    <div className="bg-[#00a4ff] content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full" data-name="띠배너-Mo-수정">
      <p className="font-['Syne:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[30px] text-black w-full">AI-Native OS Hackathon</p>
      <p className="font-['Syne:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-black w-full">@STANFORD / May 9-10th</p>
      <Frame />
    </div>
  );
}
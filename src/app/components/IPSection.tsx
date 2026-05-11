import { ReactNode } from "react";

const BLUE = "#4D9FFF";
const GRAY_LINE = "#222222";
// 텍스트 대비(Contrast)를 높이기 위해 기존 #666666에서 더 밝은 색상으로 변경
const TEXT_MUTED = "#999999";

type BadgeType =
  | "uspto"
  | "kipo"
  | "epo"
  | "wipo"
  | "cnipa"
  | "default";

const badgeStyles: Record<
  BadgeType,
  { color: string; bg: string; border: string }
> = {
  uspto: {
    color: "#4D9FFF",
    bg: "rgba(77,159,255,0.07)",
    border: "rgba(77,159,255,0.3)",
  },
  kipo: {
    color: "#aaaaaa",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.15)",
  },
  epo: {
    color: "#ffcc55",
    bg: "rgba(255,204,85,0.07)",
    border: "rgba(255,204,85,0.3)",
  },
  wipo: {
    color: "#88ccff",
    bg: "rgba(136,204,255,0.07)",
    border: "rgba(136,204,255,0.3)",
  },
  cnipa: {
    color: "#ff6432",
    bg: "rgba(255,100,50,0.15)",
    border: "rgba(255,100,50,0.3)",
  },
  default: {
    color: "#666666",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.08)",
  },
};

function getBadgeType(label: string): BadgeType {
  const l = label.toUpperCase();
  if (l.includes("US")) return "uspto";
  if (l.includes("KR")) return "kipo";
  if (l.includes("EP") || l.includes("EU")) return "epo";
  if (l.includes("WIPO") || l.includes("WO")) return "wipo";
  if (l.includes("CN")) return "cnipa";
  return "default";
}

// 뱃지 너비 고정 (WIPO는 글자 수가 많아 조금 더 넓게 설정)
function getBadgeWidth(type: string) {
  const t = type.toUpperCase();
  if (t === "WIPO") return 64;
  return 52;
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={12}
      height={12}
      fill="none"
      strokeWidth={2}
      style={{
        stroke: "currentColor",
        flexShrink: 0,
        display: "block",
      }}
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── 컴포넌트: 활성화된 뱃지 (링크가 있는 뱃지만 렌더링됨) ──
function ActiveBadge({
  type,
  url,
}: {
  type: string;
  url: string;
}) {
  const style = badgeStyles[getBadgeType(type)];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: getBadgeWidth(type),
        height: 27,
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
        textDecoration: "none",
        fontSize: 10,
        fontWeight: 600,
        fontFamily: "'Geist Mono', monospace",
        textTransform: "uppercase",
        flexShrink: 0,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.opacity = "0.8")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.opacity = "1")
      }
    >
      {type} <ExternalLinkIcon />
    </a>
  );
}

interface IPRowProps {
  title: string;
  desc?: string;
  num?: string;
  url?: string;
  links?: { type: string; url: string }[];
}

function IPRow({ title, desc, num, url, links }: IPRowProps) {
  const hasLinks = links && links.length > 0;

  return (
    <div
      className="aios-ip-row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "24px 28px",
        background: "#000000",
        transition: "background 0.2s",
        gap: 32,
      }}
    >
      {/* ── Left Side: 텍스트 정보 ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 6,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          className="keep-all"
          style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.9)", // 가독성을 위해 대비 높임
          }}
        >
          {title}
        </div>
        {desc && (
          <div
            className="keep-all"
            style={{
              fontSize: 12,
              color: TEXT_MUTED,
              fontFamily: "'Google Sans', sans-serif",
            }}
          >
            {desc}
          </div>
        )}
        {num && (
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.45)", // 가독성을 위해 대비 높임
            }}
          >
            {num}
          </div>
        )}
      </div>

      {/* ── Right Side: 뱃지 영역 (모바일 대응 클래스 aios-ip-badges 적용됨) ── */}
      <div
        className="aios-ip-badges"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {/* Whitepapers (단일 URL 버튼) */}
        {url && !hasLinks && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.color =
                "rgba(255,255,255,0.4)";
            }}
          >
            <ExternalLinkIcon />
          </a>
        )}

        {/* Patents (다중 링크 버튼만 우측 정렬 렌더링) */}
        {hasLinks &&
          links.map((lnk, idx) => (
            <ActiveBadge
              key={`badge-${idx}`}
              type={lnk.type}
              url={lnk.url}
            />
          ))}
      </div>
    </div>
  );
}

function CategoryHeader({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: BLUE,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "block",
          width: 20,
          height: 1,
          background: BLUE,
        }}
      />
      {children}
    </div>
  );
}

function ItemList({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: GRAY_LINE,
      }}
    >
      {children}
    </div>
  );
}

export function IPSection() {
  return (
    <section
      style={{
        padding: "120px 0",
        borderBottom: `1px solid ${GRAY_LINE}`,
        background: "#111",
      }}
    >
      <div
        className="aios-inner"
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 60px",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            color: BLUE,
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 1,
              background: BLUE,
            }}
          />
          Technical Whitepapers & Patents
          <span
            style={{
              display: "block",
              width: 24,
              height: 1,
              background: BLUE,
            }}
          />
        </div>

        <h2
          className="keep-all"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3vw, 42px)",
            color: "#fff",
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          Intellectual Property Portfolio
        </h2>

        {/* ── Technical Whitepapers ── */}
        <div style={{ marginBottom: 64 }}>
          <CategoryHeader>Technical Whitepapers</CategoryHeader>
          <ItemList>
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-1-Web3-ai.pdf"
              title="Newnal Web3 ai Technical Whitepaper"
              desc="'My own ai' (another-i) model that learns from personal data"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-2-Web3-ai-OS.pdf"
              title="Newnal Web3 ai OS Technical Whitepaper"
              desc="Blockchain-based 'Appless OS' architecture for personal AI agents having Web3 ai-ID and Web3 ai-Contract"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-3-Web3-Telecom.pdf"
              title="Newnal Web3 Telecom Technical Whitepaper"
              desc="Next-generation decentralized and secure communication protocol including AI-involved calls"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-4-Newnal-ai-Agent-Place.pdf"
              title="Newnal ai Agent Place Technical Whitepaper"
              desc="Marketplace for personal data and ai(another-i) agent service exchange"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-5-InfraBlockchain.pdf"
              title="Newnal InfraBlockchain Technical Whitepaper"
              desc="Stablecoin-native public federated multi-blockchain network and verifiable web data infrastructure"
            />
            <IPRow
              url="https://infrablockchain.net/documents/Universal_Resource_Auth_Technical_Whitepaper_v0.7c.pdf"
              title="Universal Resource Auth (UR-Auth) Protocol and System Architecture Technical Whitepaper"
              desc="Blockchain-based Web-scale Data Ownership Management Technology"
            />
            <IPRow
              url="https://infrablockchain.net/documents/InfraBlockchain_Technical_White_Paper_Version_2_4_ENG_202008.pdf"
              title="InfraBlockchain Technical Whitepaper"
              desc="Stablecoin as system tx fee token, Transaction-as-a-Vote, Proof-of-Transaction(PoT) consensus algorithm"
            />
            <IPRow
              url="https://infrablockchain.net/documents/YOSEMITE_Hybrid_Exchange_Technical_White_Paper_20170731a.pdf"
              title="ON/OFF-Chain Hybrid Token Exchange System Technical Whitepaper"
              desc="Blockchain-based large-scale high frequency trading system technology"
            />
            <IPRow
              url="https://docs.infrablockchain.net/infrablockchain-docs/infrablockchain/learn/architecture/architecture"
              title="InfraBlockchain-Substrate Multi-Blockchain Developer Documentation"
            />
            <IPRow
              url="https://docs.infrablockchain.net/infrablockchain-antelope"
              title="InfraBlockchain-Antelope Developer Documentation"
            />
            <IPRow
              url="https://github.com/InfraBlockchain/infra-did-method-specs/blob/main/docs/Infra-DID-method-spec.md"
              title="InfraDID Method Specification"
            />
            <IPRow
              url="https://www.w3.org/TR/did-extensions-methods/"
              title="InfraDID W3C DID Spec. Registry (did:infra)"
            />
            <IPRow
              url="https://github.com/infrablockchain"
              title="InfraBlockchain Open-Source Technology"
            />
          </ItemList>
        </div>

        {/* ── Utility Patents ── */}
        <div>
          <CategoryHeader>Utility Patents</CategoryHeader>
          <ItemList>
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=US448394725",
                },
                {
                  type: "EP",
                  url: "https://worldwide.espacenet.com/patent/search/family/087933602/publication/EP4507248A1?q=23195338.1",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230103842",
                },
              ]}
              title="Blockchain-Based Web Data Ownership and Data Access Management Method and System for Tracking AI Data Collection"
              num="US-20250055712-A1 / EP-23195338.1 / 10-2023-0103842"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1K4kjA9sv-IQKnzz9rA_Skes7DHTXnt80/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1v2jF65mgN7cztVWpMjhEAUsJiCrcQhUo/view",
                },
              ]}
              title="Personalized AI Action Graph Generation Model Based AI Inference Device"
              num="US-18/779899 / 10-2024-0090806"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1gIN7EaB8WVD0-U6jtHKVgv-muMzunapp/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/17aJpJPQfQ7UQm9L8psnMZj9G1l54Ss6l/view",
                },
              ]}
              title="A Device and Method for Owning and Trading Verifiable Personal Data Through Blockchain Based Personal Web Nodes"
              num="US-19/038309 / 10-2025-0019132"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=US444092601",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230073929",
                },
              ]}
              title="Device for Providing Blockchain DID-Based Multi Cloud Service and Its Operating Method"
              num="US-20240414014-A1 / 10-2023-0073929"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1Zm0dULHUoKix4MI4XDuXUcVPYZa0rBpe/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1Hy_F5pxuBbsxIQtYjFwTkKKCYXcgo3DY/view",
                },
              ]}
              title="Mobile Device for Operating Personalized On-Device AI Agent Based on Personal Data"
              num="US-19/059568 / 10-2025-0019132"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/138fP9gKDgIkga-ee5k4S3Jt0fnnIL0Q8/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1qV7EJjz0GQ308mcdIXqfH7p7FUsLWhiC/view",
                },
              ]}
              title="User Interface for Running a Personalized AI-Dedicated Operating System on Various Types of User Devices"
              num="US-19/277871 / 10-2025-0098140"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-63-884059-P-1.pdf",
                },
              ]}
              title="Blockchain-Based AI Computing Mobile Operating System for Secure Decentralized Personal Data and Personalized AI Agent Services"
              num="US-63/884059"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/10r1XigF6h6GejNC2cIi5QHBP3CGeMutb/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1BKJMC00WWMzBXVps0-q8AFC-xrtVjpZy/view",
                },
              ]}
              title="Decentralized AI Agent Network System Built Upon Blockchain-Based Web3 AI-ID and Web3 AI-Contract for Verifiable Confidential AI Agent Computing"
              num="US-19/303959, US-63/764594 / 10-2025-0107438"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-63-865619-P-1.pdf",
                },
              ]}
              title="Blockchain-Based AI Agent Service Marketplace System Involving Personal AI Agents and Service AI Agents Utilizing Personal Data"
              num="US-63/865619"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/13RyE757n5GoGMqk8RVvgLvFQo6_NItKn/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1YaglpOjWKW5cW3Gl-diGtu-yIFBG3ovU/view",
                },
              ]}
              title="A Device and Method for Extracting and Structuring Verifiable Personal Data from User Input and Output Data Captured on a Device Based on a Multi-Modal and Language AI Model"
              num="US-19/041098 / 10-2024-0014525"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1cMYzHNjKoPkHk5GskGRoQzHA68wnVxO5/view",
                },
              ]}
              title="Method and Device for Configuring and Operating Self-Evolving Personal AI Agent Based on Personal Data"
              num="10-2026-0012833"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1l4XWH1ZSgCWtfcrEsBtMyMRnn1PeJlOc/view",
                },
              ]}
              title="Blockchain-Based Home Node Device and Server-Based Operating System for Providing Personal Data Services and Personal AI Agent Services"
              num="10-2026-0013613"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-19-104055-2.pdf",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2024048838",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220108948",
                },
              ]}
              title="Electronic Device and Method Providing Secret Messenger Function Through End to End Encryption Based on Blockchain DID Technology"
              num="US-19/104055 / WO/2024/048838 / 10-2773087"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-19-059751.pdf",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1OacAVR4WUz7i7fe9fyZ56jMgVAEjkUYK/view",
                },
              ]}
              title="Method and Device for Building Decentralized Secure Communication Infrastructure Network Based on Blockchain and DID Technology"
              num="US-19/059751 / 10-2025-0017836"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US11636450B2/en?oq=US-11636450-B2",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2019182202",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020180064925",
                },
              ]}
              title="Blockchain System to Which Proof-of-Transaction Consensus Algorithm is Applied, and Method Therefor"
              num="US-11636450-B2 / WO/2019/182202 / 10-225081"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US20240330915A1/en?oq=US-20240330915-A1",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230042651",
                },
              ]}
              title="Multi Blockchain Network System Without Native Cryptocurrency Based on Aggregated Proof-of-Transaction Consensus"
              num="US-20240330915-A1 / 1020230042651"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020190102905",
                },
              ]}
              title="Server and Method for Credit Transaction Using Blockchain Network"
              num="10-2249864"
            />
            <IPRow
              links={[
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2019035573",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020200146111",
                },
              ]}
              title="The Trading System and the Method Based on a Blockchain"
              num="WO/2019/035573 / 10-2309819"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-18-709142-2.pdf",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2023085802",
                },
              ]}
              title="DID Authentication Method Using Smart Card and Smart Card Device"
              num="US-18/709142 / WO/2023/085802"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230165942",
                },
              ]}
              title="High-Performance Consensus Algorithm Simulator"
              num="10-2023-0165942"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210138662",
                },
              ]}
              title="The System and the Method for Managing Distribution History Using Non-Fungible Token"
              num="10-2700653"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220130057",
                },
              ]}
              title="System and Method for Trading Based on Blockchain Technologies"
              num="10-2022-0130057"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210090319",
                },
              ]}
              title="AI Model Training Apparatus and Method for Reading Test Results of a Diagnostic Kit"
              num="10-2613633"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033409",
                },
              ]}
              title="A System and Method for Issuing and Verifying Digital Vaccination Certificates"
              num="10-2478963"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US20240185994A1/en?oq=US-20240185994-A1",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2022196851",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033413",
                },
              ]}
              title="Method and System for Providing Certification of Vaccine Inoculation and Post-Inoculation Management"
              num="US-20240185994-A1 / WO/2022/196851 / 10-2488139"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033415",
                },
              ]}
              title="Electronic Device and Method for Proving Private Information Between Individuals Based on Blockchain Technology"
              num="10-2490640"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210120508",
                },
              ]}
              title="Method and System for Certificating COVID-19 Antibody"
              num="10-2591773"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220100263",
                },
              ]}
              title="Identity Management Systems and Methods Using DID Based on Blockchain Technology"
              num="10-2022-0100263"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220100264",
                },
              ]}
              title="AI-Based Identity Recognition Method and Electronic Device Thereof"
              num="10-2022-0100264"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220108933",
                },
              ]}
              title="Blockchain DID-Based Real-Time Real Estate Registration Management System"
              num="10-2022-0108933"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230051359",
                },
              ]}
              title="Vehicle Remote Control and Vehicle Information Management Method Using Vehicle-DID Based on Blockchain Networks and the Vehicle Device Thereof"
              num="10-2023-0051359"
            />
          </ItemList>
        </div>
      </div>
    </section>
  );
}
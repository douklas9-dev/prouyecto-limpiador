import { useState, useRef, useCallback, useEffect } from 'react'

const SYMBOLS = {
  '\\longrightarrow': '\u27F6',
  '\\longleftarrow': '\u27F5',
  '\\Longrightarrow': '\u27F9',
  '\\Longleftarrow': '\u27F8',
  '\\rightleftharpoons': '\u21CC',
  '\\leftrightharpoons': '\u21CB',
  '\\longrightarrow': '\u27F6',
  '\\longleftarrow': '\u27F5',
  '\\mapsto': '\u21A6',
  '\\longmapsto': '\u27FC',
  '\\hookrightarrow': '\u21AA',
  '\\hookleftarrow': '\u21A9',
  '\\rightarrow': '\u2192',
  '\\leftarrow': '\u2190',
  '\\Rightarrow': '\u21D2',
  '\\Leftarrow': '\u21D0',
  '\\leftrightarrow': '\u2194',
  '\\Leftrightarrow': '\u21D4',
  '\\uparrow': '\u2191',
  '\\downarrow': '\u2193',
  '\\Uparrow': '\u21D1',
  '\\Downarrow': '\u21D3',
  '\\updownarrow': '\u2195',
  '\\Updownarrow': '\u21D5',
  '\\nearrow': '\u2197',
  '\\searrow': '\u2198',
  '\\nwarrow': '\u2196',
  '\\swarrow': '\u2199',
  '\\times': '\u00D7',
  '\\div': '\u00F7',
  '\\pm': '\u00B1',
  '\\mp': '\u2213',
  '\\cdot': '\u00B7',
  '\\neq': '\u2260',
  '\\ne': '\u2260',
  '\\leq': '\u2264',
  '\\ge': '\u2265',
  '\\geq': '\u2265',
  '\\ll': '\u226A',
  '\\gg': '\u226B',
  '\\approx': '\u2248',
  '\\equiv': '\u2261',
  '\\sim': '\u223C',
  '\\simeq': '\u2243',
  '\\cong': '\u2245',
  '\\propto': '\u221D',
  '\\prec': '\u227A',
  '\\succ': '\u227B',
  '\\preceq': '\u227C',
  '\\succeq': '\u227D',
  '\\subset': '\u2282',
  '\\supset': '\u2283',
  '\\subseteq': '\u2286',
  '\\supseteq': '\u2287',
  '\\cup': '\u222A',
  '\\cap': '\u2229',
  '\\sqcup': '\u2294',
  '\\sqcap': '\u2293',
  '\\in': '\u2208',
  '\\notin': '\u2209',
  '\\ni': '\u220B',
  '\\emptyset': '\u2205',
  '\\varnothing': '\u2205',
  '\\exists': '\u2203',
  '\\forall': '\u2200',
  '\\neg': '\u00AC',
  '\\lnot': '\u00AC',
  '\\wedge': '\u2227',
  '\\vee': '\u2228',
  '\\oplus': '\u2295',
  '\\ominus': '\u2296',
  '\\otimes': '\u2297',
  '\\oslash': '\u2298',
  '\\odot': '\u2299',
  '\\dagger': '\u2020',
  '\\ddagger': '\u2021',
  '\\infty': '\u221E',
  '\\partial': '\u2202',
  '\\nabla': '\u2207',
  '\\alpha': '\u03B1',
  '\\beta': '\u03B2',
  '\\gamma': '\u03B3',
  '\\delta': '\u03B4',
  '\\epsilon': '\u03B5',
  '\\varepsilon': '\u03B5',
  '\\zeta': '\u03B6',
  '\\eta': '\u03B7',
  '\\theta': '\u03B8',
  '\\vartheta': '\u03B8',
  '\\iota': '\u03B9',
  '\\kappa': '\u03BA',
  '\\lambda': '\u03BB',
  '\\mu': '\u03BC',
  '\\nu': '\u03BD',
  '\\xi': '\u03BE',
  '\\pi': '\u03C0',
  '\\varpi': '\u03D6',
  '\\rho': '\u03C1',
  '\\varrho': '\u03F1',
  '\\sigma': '\u03C3',
  '\\varsigma': '\u03C2',
  '\\tau': '\u03C4',
  '\\upsilon': '\u03C5',
  '\\phi': '\u03C6',
  '\\varphi': '\u03C6',
  '\\chi': '\u03C7',
  '\\psi': '\u03C8',
  '\\omega': '\u03C9',
  '\\Gamma': '\u0393',
  '\\Delta': '\u0394',
  '\\Theta': '\u0398',
  '\\Lambda': '\u039B',
  '\\Xi': '\u039E',
  '\\Pi': '\u03A0',
  '\\Sigma': '\u03A3',
  '\\Upsilon': '\u03A5',
  '\\Phi': '\u03A6',
  '\\Psi': '\u03A8',
  '\\Omega': '\u03A9',
  '\\sum': '\u2211',
  '\\prod': '\u220F',
  '\\coprod': '\u2210',
  '\\int': '\u222B',
  '\\iint': '\u222C',
  '\\iiint': '\u222D',
  '\\oint': '\u222E',
  '\\therefore': '\u2234',
  '\\because': '\u2235',
  '\\angle': '\u2220',
  '\\measuredangle': '\u2221',
  '\\perp': '\u22A5',
  '\\parallel': '\u2225',
  '\\surd': '\u221A',
  '\\hbar': '\u210F',
  '\\ell': '\u2113',
  '\\wp': '\u2118',
  '\\Re': '\u211C',
  '\\Im': '\u2111',
  '\\aleph': '\u2135',
  '\\prime': '\u2032',
  '\\diamond': '\u22C4',
  '\\triangle': '\u25B3',
  '\\bigtriangleup': '\u25B3',
  '\\bigtriangledown': '\u25BD',
  '\\triangleleft': '\u25C1',
  '\\triangleright': '\u25B7',
  '\\lhd': '\u22B2',
  '\\rhd': '\u22B3',
  '\\unlhd': '\u22B4',
  '\\unrhd': '\u22B5',
  '\\top': '\u22A4',
  '\\bot': '\u22A5',
  '\\models': '\u22A8',
  '\\dashv': '\u22A3',
  '\\vdash': '\u22A2',
  '\\smile': '\u2323',
  '\\frown': '\u2322',
  '\\vdots': '\u22EE',
  '\\cdots': '\u22EF',
  '\\ddots': '\u22F1',
  '\\ldots': '\u2026',
  '\\dots': '\u2026',
  '\\cdotp': '\u00B7',
  '\\colon': ':',
  '\\%': '%',
}

const WRAPPER_CMDS = [
  'textbf', 'textit', 'texttt', 'textsc', 'textsl', 'textup',
  'textrm', 'textsf', 'underline', 'boldsymbol',
  'mathrm', 'mathbf', 'mathit', 'mathsf', 'mathtt',
  'mathcal', 'mathbb', 'mathscr', 'mathfrak',
  'emph', 'mbox', 'bm', 'boxed', 'fbox', 'framebox',
  'textcolor', 'colorbox', 'fcolorbox',
  'bf', 'it', 'rm', 'sf', 'tt', 'sc', 'sl', 'up',
]

const STRIP_CMDS = [
  'label', 'ref', 'pageref', 'cite', 'nocite', 'bibitem',
  'usepackage', 'documentclass', 'newcommand', 'renewcommand',
  'def', 'let', 'setlength',
  'hspace', 'vspace', 'hfill', 'vfill',
  'bigskip', 'medskip', 'smallskip', 'noindent', 'indent',
  'newpage', 'clearpage', 'pagebreak', 'linebreak',
  'centering', 'raggedright', 'raggedleft',
  'footnote', 'marginpar', 'caption',
  'title', 'author', 'date', 'maketitle',
  'tableofcontents', 'listoffigures', 'listoftables', 'abstract',
  'part', 'chapter', 'section', 'subsection', 'subsubsection',
  'paragraph', 'subparagraph', 'appendix',
  'bibliography', 'bibliographystyle',
  'include', 'input', 'subfile', 'includegraphics',
  'hline', 'vline', 'cline',
  'displaystyle', 'textstyle', 'scriptstyle', 'scriptscriptstyle',
  'qquad', 'quad', 'enspace', 'thinspace', 'negthinspace',
  'left', 'right', 'big', 'Big', 'bigg', 'Bigg',
  'bigl', 'Bigl', 'biggl', 'Biggl',
  'bigr', 'Bigr', 'biggr', 'Biggr',
  'limits', 'nolimits',
  'begin', 'end',
]

const WRAPPER_CMDS_SORTED = [...WRAPPER_CMDS].sort((a, b) => b.length - a.length)
const STRIP_CMDS_SORTED = [...STRIP_CMDS].sort((a, b) => b.length - a.length)

function escapeRx(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function cleanLatex(text) {
  let r = text

  r = r.replace(/[\u200B-\u200D\uFEFF\u200E\u200F\u00AD\u2060-\u2064]/g, '')
  r = r.replace(/[\u2028\u2029]/g, '\n')
  r = r.replace(/\r\n/g, '\n')
  r = r.replace(/\r/g, '\n')
  r = r.replace(/[\u00A0\u202F\u2007\u205F]/g, ' ')
  r = r.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\x80-\x9F]/g, '')

  r = r.replace(/\\begin\{[^}]*\}[^\n]*/g, '')
  r = r.replace(/\\end\{[^}]*\}[^\n]*/g, '')

  r = r.replace(/\$\$/g, '')
  r = r.replace(/\\\[/g, '')
  r = r.replace(/\\\]/g, '')
  r = r.replace(/\\\(/g, '')
  r = r.replace(/\\\)/g, '')

  const symSorted = Object.keys(SYMBOLS).sort((a, b) => b.length - a.length)
  for (const sym of symSorted) {
    r = r.replace(new RegExp(escapeRx(sym), 'g'), SYMBOLS[sym])
  }

  {
    let prev
    do {
      prev = r
      for (const cmd of WRAPPER_CMDS_SORTED) {
        r = r.replace(new RegExp(`\\\\${cmd}\\*?(\\[[^\\]]*\\])?\\{([^}]*)\\}`, 'g'), '$2')
      }
    } while (r !== prev)
  }

  r = r.replace(/\\text\[[^\]]*\]\{([^}]*)\}/g, '$1')

  for (const cmd of STRIP_CMDS_SORTED) {
    r = r.replace(new RegExp(`\\\\${cmd}(\\[[^\\]]*\\])?\\{[^}]*\\}`, 'g'), '')
    r = r.replace(new RegExp(`\\\\${cmd}\\[[^\\]]*\\]`, 'g'), '')
  }

  r = r.replace(/\$/g, '')

  r = r.replace(/\\([,;:!@])/g, '')

  r = r.replace(/\\([.'"()\[\]{}…_^])/g, '$1')

  r = r.replace(/\\\s+/g, ' ')

  r = r.replace(/\^\{([^}]*)\}/g, '$1')
  r = r.replace(/_\{([^}]*)\}/g, '$1')
  r = r.replace(/\^(.)/g, '$1')
  r = r.replace(/_(.)/g, '$1')

  r = r.replace(/\\(?=\s|$)/g, '')

  r = r.replace(/\\\[([^\]]*)\\\]/g, '$1')
  r = r.replace(/\\\(([^)]*)\\\)/g, '$1')

  r = r.replace(/[ \t]+/g, ' ')
  r = r.split('\n').map(l => l.trim()).join('\n')
  r = r.replace(/\n{3,}/g, '\n\n')

  return r.trim()
}

function LaTeXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7h10M7 12h6M7 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const outputRef = useRef(null)
  const timerRef = useRef(null)
  const flashTimerRef = useRef(null)

  const cleaned = cleanLatex(input)

  const prevCleanedRef = useRef(cleaned)
  useEffect(() => {
    if (prevCleanedRef.current !== cleaned && cleaned.length > 0) {
      setFlash(true)
      clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => setFlash(false), 600)
    }
    prevCleanedRef.current = cleaned
  }, [cleaned])

  const handleCopy = useCallback(() => {
    if (!cleaned) return
    clearTimeout(timerRef.current)
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(cleaned).then(() => {
        setCopied(true)
        timerRef.current = setTimeout(() => setCopied(false), 2000)
      }).catch(() => fallbackCopy(cleaned))
    } else {
      fallbackCopy(cleaned)
    }
  }, [cleaned])

  function fallbackCopy(text) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); setCopied(true); timerRef.current = setTimeout(() => setCopied(false), 2000) } catch {}
    document.body.removeChild(ta)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(flashTimerRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark text-label dark:text-label-dark transition-colors duration-300 selection:bg-accent/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* Header */}
        <header className="mb-8 sm:mb-10 animate-fade-up" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center">
              <LaTeXIcon />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Limpiador LaTeX
            </h1>
          </div>
          <p className="text-secondary dark:text-secondary-dark text-sm sm:text-base">
            Pega c&oacute;digo LaTeX y obt&eacute;n texto limpio al instante
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>

          {/* Input */}
          <div className="flex flex-col">
            <label htmlFor="input" className="text-xs font-medium text-secondary dark:text-secondary-dark uppercase tracking-wider mb-2 pl-1">
              C&oacute;digo original
            </label>
            <div className="relative flex-1">
              <textarea
                id="input"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="block w-full min-h-[18rem] lg:min-h-0 h-full bg-card dark:bg-card-dark rounded-2xl border border-border dark:border-border-dark p-4 sm:p-5 font-mono text-sm leading-relaxed text-label dark:text-label-dark placeholder:text-secondary/50 dark:placeholder:text-secondary-dark/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all duration-200 shadow-sm"
                placeholder="Pega o escribe tu c\u00F3digo aqu\u00ED\u2026"
                spellCheck={false}
              />
            </div>
            <div className="mt-2.5 text-xs text-secondary dark:text-secondary-dark pl-1 tabular-nums">
              {input.length} caractere{input.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 pl-1">
              <label className="text-xs font-medium text-secondary dark:text-secondary-dark uppercase tracking-wider">
                Resultado limpio
              </label>
              <button
                onClick={handleCopy}
                disabled={!cleaned}
                className={`relative text-xs font-medium px-3.5 py-1.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-0 disabled:pointer-events-none ${
                  copied
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-card dark:bg-card-dark text-secondary dark:text-secondary-dark border-border dark:border-border-dark hover:bg-accent hover:text-white hover:border-accent active:scale-[0.97] shadow-sm'
                }`}
              >
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <div
              ref={outputRef}
              className={`flex-1 min-h-[18rem] lg:min-h-0 h-full bg-card dark:bg-card-dark rounded-2xl border p-4 sm:p-5 font-mono text-sm leading-relaxed overflow-auto whitespace-pre-wrap break-words shadow-sm transition-all duration-200 ${
                flash ? 'border-accent/40' : 'border-border dark:border-border-dark'
              }`}
            >
              {cleaned ? (
                <span className="text-label dark:text-label-dark">{cleaned}</span>
              ) : (
                <span className="text-secondary/40 dark:text-secondary-dark/40 italic">
                  {input ? 'No hay nada que limpiar\u2026' : 'El resultado aparecer\u00E1 aqu\u00ED\u2026'}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Stats bar */}
        {cleaned && (
          <div className="mt-4 animate-fade-up flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-secondary dark:text-secondary-dark" style={{ animationDelay: '0.2s' }}>
            <span>
              Original: <strong className="text-label dark:text-label-dark font-medium">{input.length}</strong> caracteres
            </span>
            <span className="text-border dark:text-border-dark" aria-hidden="true">&middot;</span>
            <span>
              Limpio: <strong className="text-label dark:text-label-dark font-medium">{cleaned.length}</strong> caracteres
            </span>
            {cleaned.length < input.length && (
              <>
                <span className="text-border dark:text-border-dark" aria-hidden="true">&middot;</span>
                <span>
                  Se eliminaron <strong className="text-accent font-medium">{input.length - cleaned.length}</strong> caracteres
                </span>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-xs text-secondary/60 dark:text-secondary-dark/60 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Procesamiento 100 % local &mdash; nada sale de tu navegador
        </footer>
      </div>
    </div>
  )
}

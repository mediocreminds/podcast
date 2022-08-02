import { Fragment, useId, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import clsx from 'clsx'

import { AudioPlayer } from '@/components/player/AudioPlayer'
import posterImage from '../../public/images/MMLogoBlack.png'
import siteConfig from '@/site-config'

function randomBetween(min, max, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  }
}

function Waveform(props) {
  let id = useId()
  let bars = {
    total: 100,
    width: 2,
    gap: 2,
    minHeight: 40,
    maxHeight: 100,
  }

  let barHeights = Array.from(
    { length: bars.total },
    randomBetween(bars.minHeight, bars.maxHeight)
  )

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <linearGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
        </mask>
        <pattern
          id={`${id}-pattern`}
          width={bars.total * bars.width + bars.total * bars.gap}
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({ length: bars.total }, (_, index) => (
            <rect
              key={index}
              width={bars.width}
              height={`${barHeights[index]}%`}
              x={bars.gap * (index + 1) + bars.width * index}
              fill={`url(#${id}-fade)`}
            />
          ))}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-gradient)`}
        mask={`url(#${id}-mask)`}
        opacity="0.25"
      />
    </svg>
  )
}

function TinyWaveFormIcon({ colors = [], ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
        className={colors[0]}
      />
      <path
        d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
        className={colors[1]}
      />
    </svg>
  )
}

function SpotifyIcon({ className, ...props }) {
  return (
    <div className={className}>
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 1481.97 1481.97"
        version="1.1"
        {...props}
      >
        <defs>
          <clipPath id="clip1">
            <path d="M 0 0 L 1481.96875 0 L 1481.96875 1481.96875 L 0 1481.96875 Z M 0 0 " />
          </clipPath>
        </defs>
        <g id="surface1">
          <g clipPath="url(#clip1)" clipRule="nonzero">
            <path
              style={{
                stroke: 'none',
                fillRule: 'evenodd',
                fill: 'rgb(32.499695%,72.898865%,36.898804%)',
                fillOpacity: 1,
              }}
              d="M 1481.96875 740.984375 C 1481.96875 1150.21875 1150.21875 1481.96875 740.984375 1481.96875 C 331.75 1481.96875 0 1150.21875 0 740.984375 C 0 331.75 331.75 0 740.984375 0 C 1150.21875 0 1481.96875 331.75 1481.96875 740.984375 "
            />
          </g>
          <path
            style={{
              stroke: 'none',
              fillRule: 'evenodd',
              fill: 'rgb(0.799561%,0.799561%,0.799561%)',
              fillOpacity: 1,
            }}
            d="M 1282.511719 595.757813 C 1282.289063 649.410156 1226.039063 682.265625 1178.921875 655.605469 C 1146.96875 637.527344 1114.261719 621.140625 1080.191406 607.480469 C 1012.5 580.34375 942.347656 562.082031 870.644531 549.433594 C 820.730469 540.628906 770.445313 534.800781 719.886719 531.761719 C 667.3125 528.605469 614.707031 528.234375 562.058594 530.957031 C 501.734375 534.082031 441.886719 540.703125 382.828125 553.460938 C 361.035156 558.167969 339.496094 564.101563 317.945313 569.863281 C 304.730469 573.394531 291.703125 573.84375 278.539063 569.992188 C 249.726563 561.5625 229.863281 535.746094 229.007813 505.515625 C 228.179688 476.148438 246.296875 448.851563 274.761719 439.46875 C 295.601563 432.601563 316.988281 427.199219 338.390625 422.25 C 391.363281 410.011719 445.082031 402.441406 499.230469 397.488281 C 556.71875 392.25 614.316406 390.558594 671.949219 392.210938 C 813.945313 396.269531 953.175781 417.039063 1087.921875 463.550781 C 1142.859375 482.519531 1195.738281 506.0625 1246 535.386719 C 1263.910156 545.84375 1275.941406 560.574219 1280.519531 580.953125 C 1281.609375 585.792969 1281.871094 590.820313 1282.511719 595.757813 "
          />
          <path
            style={{
              stroke: 'none',
              fillRule: 'evenodd',
              fill: 'rgb(0.799561%,0.799561%,0.799561%)',
              fillOpacity: 1,
            }}
            d="M 611.765625 761.257813 C 527.128906 761.609375 440.433594 772.101563 355.75 797.234375 C 341.949219 801.328125 328.105469 801.605469 314.585938 796.128906 C 292.582031 787.214844 278.265625 765.164063 279.042969 741.835938 C 279.851563 717.5 294.691406 696.304688 318.152344 689.140625 C 342.027344 681.851563 366.261719 675.53125 390.632813 670.117188 C 450.628906 656.792969 511.433594 649.746094 572.875 647.414063 C 705.054688 642.398438 834.179688 659.496094 960.148438 699.871094 C 1023.851563 720.289063 1084.78125 747.019531 1142.328125 781.246094 C 1145.199219 782.949219 1148.039063 784.691406 1150.878906 786.429688 C 1180.898438 804.765625 1184.480469 841.683594 1170.171875 865.207031 C 1153.800781 892.105469 1119.761719 900.46875 1091.46875 884.511719 C 1075.511719 875.511719 1059.738281 866.125 1043.421875 857.808594 C 968.628906 819.6875 889.324219 794.972656 807.035156 779.398438 C 743.675781 767.40625 679.722656 761.542969 611.765625 761.257813 "
          />
          <path
            style={{
              stroke: 'none',
              fillRule: 'evenodd',
              fill: 'rgb(0.799561%,0.799561%,0.799561%)',
              fillOpacity: 1,
            }}
            d="M 624.996094 886.777344 C 722.421875 887.800781 817.730469 900.96875 910.222656 932.164063 C 961.242188 949.367188 1009.960938 971.628906 1056.230469 999.191406 C 1060.238281 1001.578125 1064.308594 1003.929688 1068.011719 1006.738281 C 1086.679688 1020.921875 1091.53125 1046.589844 1079.511719 1066.800781 C 1067.859375 1086.398438 1043.128906 1094.289063 1021.980469 1084.949219 C 1017.738281 1083.078125 1013.761719 1080.558594 1009.75 1078.179688 C 931.332031 1031.699219 846.710938 1002.910156 756.761719 989.132813 C 701.566406 980.679688 646.0625 977.746094 590.328125 979.9375 C 518.230469 982.773438 447.042969 992.773438 376.609375 1008.371094 C 369.496094 1009.941406 362.175781 1011.371094 354.9375 1011.449219 C 333.128906 1011.691406 314.722656 996.222656 310.894531 975.25 C 306.839844 953.042969 317.839844 932.226563 338.210938 924.039063 C 342.507813 922.3125 347.097656 921.207031 351.636719 920.1875 C 409.246094 907.253906 467.398438 897.472656 526.238281 892.496094 C 559.085938 889.714844 592.074219 888.625 624.996094 886.777344 "
          />
        </g>
      </svg>
    </div>
  )
}

function ApplePodcastIcon({ className, ...props }) {
  return (
    <div className={className}>
      <svg width="32px" height="32px" viewBox="0 0 300 300" {...props}>
        <g id="XMLID_632_">
          <linearGradient
            id="XMLID_2_"
            gradientUnits="userSpaceOnUse"
            x1="150"
            y1="0"
            x2="150"
            y2="300"
          >
            <stop offset="0" style={{ stopColor: '#F452FF' }} />
            <stop offset="1" style={{ stopColor: '#832BC1' }} />
          </linearGradient>
          <path
            id="XMLID_662_"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="url(#XMLID_2_)"
            d="M294.1,260c-2.9,7.4-9.6,17.8-19.2,25.2
		c-5.5,4.2-12.1,8.3-21.1,11c-9.6,2.9-21.5,3.8-36.3,3.8h-135c-14.8,0-26.6-1-36.3-3.8c-9-2.7-15.6-6.7-21.1-11
		c-9.5-7.3-16.3-17.8-19.2-25.2C0.1,245.1,0,228.2,0,217.5l0,0v-135l0,0C0,71.8,0.1,54.9,5.9,40c2.9-7.4,9.6-17.8,19.2-25.2
		c5.5-4.2,12.1-8.3,21.1-11C55.9,1,67.7,0,82.5,0l0,0h135l0,0c14.8,0,26.6,1,36.3,3.8c9,2.7,15.6,6.7,21.1,11
		c9.5,7.3,16.3,17.8,19.2,25.2c5.9,14.9,5.9,31.9,5.9,42.5v135C300,228.2,299.9,245.1,294.1,260z"
          />
          <g>
            <path
              id="XMLID_657_"
              fill="#FFFFFF"
              d="M175.7,181.1c-0.4-3.6-1.6-6.2-4-8.6c-4.5-4.7-12.4-7.8-21.7-7.8c-9.3,0-17.2,3-21.7,7.8
			c-2.3,2.5-3.6,5-4,8.6c-0.8,7-0.3,13,0.5,22.7c0.8,9.2,2.3,21.5,4.2,33.9c1.4,8.9,2.5,13.7,3.5,17.1c1.7,5.6,7.8,10.4,17.5,10.4
			c9.7,0,15.9-4.9,17.5-10.4c1-3.4,2.1-8.2,3.5-17.1c1.9-12.5,3.4-24.7,4.2-33.9C176.1,194.1,176.5,188.1,175.7,181.1z"
            />
            <path
              id="XMLID_655_"
              fill="#FFFFFF"
              d="M174.6,130.1c0,13.6-11,24.6-24.6,24.6s-24.6-11-24.6-24.6c0-13.6,11-24.6,24.6-24.6
			S174.6,116.6,174.6,130.1z"
            />
            <path
              id="XMLID_653_"
              fill="#FFFFFF"
              d="M149.7,33.2C92.3,33.4,45.3,80,44.5,137.4c-0.6,46.5,29.1,86.3,70.6,100.9
			c1,0.4,2-0.5,1.9-1.5c-0.5-3.6-1.1-7.2-1.5-10.8c-0.2-1.3-1-2.3-2.1-2.9c-32.8-14.3-55.7-47.2-55.3-85.3
			c0.5-50,41.3-90.7,91.2-91.1c51.1-0.4,92.8,41,92.8,92c0,37.7-22.8,70.1-55.3,84.4c-1.2,0.5-2,1.6-2.1,2.9
			c-0.5,3.6-1,7.2-1.5,10.8c-0.2,1.1,0.9,1.9,1.9,1.5c41.1-14.4,70.6-53.6,70.6-99.6C255.5,80.5,208,33.1,149.7,33.2z"
            />
            <path
              id="XMLID_651_"
              fill="#FFFFFF"
              d="M147.3,68.2c-37.4,1.4-67.4,32.3-67.9,69.7c-0.3,24.6,12,46.4,30.9,59.3
			c0.9,0.6,2.2-0.1,2.2-1.2c-0.3-4.3-0.3-8.1-0.1-12.1c0.1-1.3-0.4-2.5-1.4-3.4c-11.5-10.8-18.5-26.2-18.1-43.2
			c0.8-30,24.9-54.4,54.9-55.6c32.6-1.3,59.4,24.9,59.4,57.1c0,16.4-7,31.2-18.1,41.7c-0.9,0.9-1.4,2.1-1.4,3.4
			c0.2,3.9,0.1,7.7-0.1,12c-0.1,1.1,1.2,1.9,2.2,1.2c18.6-12.7,30.9-34.2,30.9-58.4C220.8,98.9,187.5,66.6,147.3,68.2z"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function GooglePodcastIcon(props) {
  return (
    <svg viewBox="0 0 48 48" height={32} width={32} {...props}>
      <path
        fill="#f9a825"
        d="M24.5,12L24.5,12c-1.381,0-2.5-1.119-2.5-2.5v-3C22,5.119,23.119,4,24.5,4h0 C25.881,4,27,5.119,27,6.5v3C27,10.881,25.881,12,24.5,12z"
      ></path>
      <path
        fill="#f9a825"
        d="M24.5,33L24.5,33c-1.381,0-2.5-1.119-2.5-2.5v-13c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v13C27,31.881,25.881,33,24.5,33z"
      ></path>
      <path
        fill="#f9a825"
        d="M24.5,44L24.5,44c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C27,42.881,25.881,44,24.5,44z"
      ></path>
      <path
        fill="#e53935"
        d="M15.5,36L15.5,36c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C18,34.881,16.881,36,15.5,36z"
      ></path>
      <path
        fill="#43a047"
        d="M33.5,20L33.5,20c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C36,18.881,34.881,20,33.5,20z"
      ></path>
      <path
        fill="#e53935"
        d="M15.5,25L15.5,25c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v9C18,23.881,16.881,25,15.5,25z"
      ></path>
      <path
        fill="#43a047"
        d="M33.5,37L33.5,37c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v9C36,35.881,34.881,37,33.5,37z"
      ></path>
      <path
        fill="#1565c0"
        d="M6.5,28L6.5,28C5.119,28,4,26.881,4,25.5v-3C4,21.119,5.119,20,6.5,20h0C7.881,20,9,21.119,9,22.5v3 C9,26.881,7.881,28,6.5,28z"
      ></path>
      <path
        fill="#1e88e5"
        d="M42.5,28L42.5,28c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C45,26.881,43.881,28,42.5,28z"
      ></path>
    </svg>
  )
}

function OvercastIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M16 28.8A12.77 12.77 0 0 1 3.2 16 12.77 12.77 0 0 1 16 3.2 12.77 12.77 0 0 1 28.8 16 12.77 12.77 0 0 1 16 28.8Zm0-5.067.96-.96-.96-3.68-.96 3.68.96.96Zm-1.226-.054-.48 1.814 1.12-1.12-.64-.694Zm2.453 0-.64.64 1.12 1.12-.48-1.76Zm.907 3.307L16 24.853l-2.133 2.133c.693.107 1.387.213 2.133.213.747 0 1.44-.053 2.134-.213ZM16 4.799C9.814 4.8 4.8 9.813 4.8 16c0 4.907 3.147 9.067 7.52 10.56l2.4-8.906c-.533-.374-.853-1.014-.853-1.707A2.14 2.14 0 0 1 16 13.813a2.14 2.14 0 0 1 2.134 2.133c0 .693-.32 1.28-.854 1.707l2.4 8.906A11.145 11.145 0 0 0 27.2 16c0-6.186-5.013-11.2-11.2-11.2Zm7.307 16.747c-.267.32-.747.427-1.12.16-.373-.267-.427-.747-.16-1.067 0 0 1.44-1.92 1.44-4.64 0-2.72-1.44-4.64-1.44-4.64-.267-.32-.213-.8.16-1.066.373-.267.853-.16 1.12.16.107.106 1.76 2.293 1.76 5.546 0 3.254-1.653 5.44-1.76 5.547Zm-3.893-2.08c-.32-.32-.267-.907.053-1.227 0 0 .8-.853.8-2.24 0-1.386-.8-2.186-.8-2.24-.32-.32-.32-.853-.053-1.226.32-.374.8-.374 1.12-.054.053.054 1.333 1.387 1.333 3.52 0 2.134-1.28 3.467-1.333 3.52-.32.32-.8.267-1.12-.053Zm-6.827 0c-.32.32-.8.373-1.12.053-.053-.106-1.333-1.386-1.333-3.52 0-2.133 1.28-3.413 1.333-3.52.32-.32.853-.32 1.12.054.32.32.267.906-.053 1.226 0 .054-.8.854-.8 2.24 0 1.387.8 2.24.8 2.24.32.32.373.854.053 1.227Zm-2.773 2.24c-.374.267-.854.16-1.12-.16-.107-.107-1.76-2.293-1.76-5.547 0-3.253 1.653-5.44 1.76-5.546.266-.32.746-.427 1.12-.16.373.266.426.746.16 1.066 0 0-1.44 1.92-1.44 4.64 0 2.72 1.44 4.64 1.44 4.64.266.32.16.8-.16 1.067Z" />
    </svg>
  )
}

function RSSIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

function PersonIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        A bunch of people with &quot;Mediocre Minds&quot; talk about stuff not
        limiting to a genre or category but exploring and discussing numerous
        things.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

export function Layout({ children }) {
  let hosts = ['Durga Prasad', 'Hari Narayana', 'Krushi Raj', 'Vishal Reddy']

  return (
    <>
      <header className="bg-cyan-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-cyan-600/20 lg:py-12 lg:px-8 xl:px-12">
          <Link
            href="/"
            className="bg-white-200 shadow-white-200 relative mx-auto block w-48 overflow-hidden rounded-lg shadow-xl sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={posterImage}
              alt="Podcast Cover"
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">{siteConfig.title}</Link>
            </p>
            <p
              className="mt-3 text-lg font-medium leading-8 text-slate-700"
              dangerouslySetInnerHTML={{ __html: siteConfig.description }}
            />
          </div>
          {/* <AboutSection className="mt-12 hidden lg:block" /> */}
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-bold leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-indigo-300', 'fill-blue-300']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Listen</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ['Spotify', SpotifyIcon, siteConfig.listen.spotify],
                ['Apple Podcast', ApplePodcastIcon, siteConfig.listen.apple],
                ['RSS Feed', RSSIcon, '/rss/feed.xml'],
                // ['Google Podcast', GooglePodcastIcon, siteConfig.listen.google],
                // ['Overcast', OvercastIcon, siteConfig.listen.overcast],
              ].map(([label, Icon, href]) => (
                <li key={label} className="flex">
                  <Link
                    href={href}
                    className="group flex items-center"
                    aria-label={label}
                  >
                    <Icon className="h-8 w-8 group-hover:opacity-60" />
                    <span className="hidden text-slate-800 hover:text-slate-400 sm:ml-3 sm:block">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute left-0 top-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-cyan-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </>
  )
}

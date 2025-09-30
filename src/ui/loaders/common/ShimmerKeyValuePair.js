import ShimmerParagraph from './ShimmerParagraph'

export default function ShimmerKeyValuePair({ keyW, valueW, keyC }) {
  return (
    <div className="shimmer-user-data-container">
      <div className="shimmer-key-value-pair-container flex items-center">
        <ShimmerParagraph height="12px" width={keyW} classes={keyC} />
        <ShimmerParagraph
          height="12px"
          width={valueW}
          classes="ml-10 my-[10px]"
        />
      </div>
    </div>
  )
}

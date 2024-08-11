import { useEffect, useRef, useState } from "react";
import "./CustomSelect.css";

export function Select({
  isMulti = false,
  value,
  onChangeHandler,
  options,
  isSearchable = false,
  placeholder = "Search...",
  onSearchHandler,
  isClearable = false,
  isDisabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  function clearOptions() {
    isMulti ? onChangeHandler([]) : onChangeHandler(undefined);
  }

  function selectOption(option) {
    if (isMulti) {
      if (value.includes(option)) {
        onChangeHandler(value.filter((o) => o !== option));
      } else {
        onChangeHandler([...value, option]);
      }
    } else {
      if (option !== value) onChangeHandler(option);
    }
  }

  function isOptionSelected(option) {
    return isMulti ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  const filteredOptions = options.filter((item) =>
    item?.label
      ?.toLocaleLowerCase()
      ?.includes(searchText.toLocaleLowerCase()?.trim())
  );

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(true)}
      tabIndex={0}
      className={`kzui-container ${isDisabled && "kzui__disabled"}`}
    >
      <span className="kzui-container__value ">
        {isMulti
          ? value?.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={`kzui-container__option-badge `}
              >
                {v.label}
                <span className="kzui-container__remove-btn ">&times;</span>
              </button>
            ))
          : value?.label}

        <div>
          {/* input search */}
          <div
            className={` ${
              isSearchable
                ? "kzui-option--show kzui__input-search "
                : "kzui__display-none"
            }`}
          >
            <input
              className="input-search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                onSearchHandler(e.target.value);
              }}
              type="text"
              placeholder={placeholder}
            />
          </div>

          {/* placeholder text */}
          <div
            className={` ${
              !isSearchable
                ? "kzui-option--show kzui__text-gray kzui__text-small"
                : "kzui__display-none"
            } ${
              isMulti
                ? value.length
                  ? "kzui__display-none"
                  : "kzui-options--show"
                : value?.label
                ? "kzui__display-none"
                : "kzui-options--show"
            }   `}
          >
            Select Option
          </div>
        </div>
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
          setSearchText("");
        }}
        className={`${
          isClearable
            ? "kzui-container__clear-btn kzui-options--show"
            : "kzui__display-none"
        }`}
      >
        &times;
      </button>
      <div className="kzui-container__divider"></div>
      <div className="kzui-container__caret"></div>
      <ul className={`kzui-options ${isOpen ? "kzui-options--show" : ""}`}>
        {filteredOptions.length ? (
          filteredOptions.map((option, index) => (
            <li
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
                setSearchText("");
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`kzui-options__option ${
                isOptionSelected(option) ? "kzui-options__option--selected" : ""
              } ${
                index === highlightedIndex
                  ? "kzui-options__option--highlighted"
                  : ""
              }`}
            >
              {option.label}
            </li>
          ))
        ) : (
          <li
            onClick={() => setIsOpen(true)}
            className="kzui-options__option kzui__text-gray kzui__text-small"
          >
            Not Found
          </li>
        )}
      </ul>
    </div>
  );
}

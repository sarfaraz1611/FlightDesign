import React, { forwardRef, useState } from "react";
import { Box, FormHelperText, Typography } from "@mui/material";
import ReactSelect from "react-select";

import EllipsisText from "react-ellipsis-text";
import styled from "styled-components";

export const SearchableDropDown = forwardRef(
  (
    {
      options,
      from,
      changeState,
      selectedstate,
      id,
      label,
      onChange,
      value,
      placeholder,
      error,
      helperText,
      menuPortalTarget,
      isDisabled,
      avatarLabel,
      isClearable,
      isSearchable = true,
      hideIndicator,
      isMulti,
      getOptionValue,
      getOptionLabel,
      controlShouldRenderValue,
      hideSelectedOptions,
      defaultValue,
      type,
      loadOptions,
      cacheOptions,
      defaultOptions,
      debounceTimeout,
      additional,
      menuHeight = "150px",
      closeMenuOnScroll,
      menuShouldBlockScroll,
      menuPlacement,
      backspaceRemovesValue,
      components,
      cacheUniqs,
      noBorder,
      view,
      ...props
    },
    ref
  ) => {
    const filteredOptions = options.filter(
      (option) => !option.includes(from?.value)
    );

    const customStyles = {
      maxHeight: "10px",
      backgroundColor: "#000",
      menu: (base) => ({
        ...base,
        marginTop: "5px",
        backgroundColor: "#FFF",
        zIndex: 9999,
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "#6F7787FF" : "white",

        "&:hover": {
          color: "black",
          background: "#BCC1CAFF",
        },
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      control: (base, state) => ({
        width: "90%",
        paddingRight: "6px",
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "22px",
        borderWidth: "1px",
        outline: "none",
        ...base,
      
        borderRadius: "0px",
        minHeight: "36px",
        pointerEvents: "auto",
        marginLeft: "10px",
        backgroundColor: state.isDisabled ? "#F8F9FA" : "#FFF",
        color: "#fff !important",
        boxShadow: noBorder && "none",
        "&:focus": {
          color: "#BCC1CAFF",
          background: "#FFFFFFFF",
          borderColor: "#9095A0FF",
          cursor: "pointer",
        },
        "&:hover": {
          color: "#BCC1CAFF",
          background: "#FFFFFFFF",
          borderColor: "#6F7787FF",
        },
        "&:disabled": {
          border: state.isDisabled ? "none !important" : "1px solid #9095A0",
          color: "#BCC1CAFF",
          background: "#FFFFFF",
        },
        input: {
          height: "auto !important",
        },
      }),
      placeholder: (base, state) => ({
        ...base,
        display:'none',
        backgroundColor: state.isDisabled ? "#F8F9FA" : "#FFFFFF",
        fontSize: "20px",
      }),
      menuList: (base) => ({
        ...base,
        textAlign: "start",
        maxHeight: menuHeight,
      }),
      singleValue: (base) => ({
        ...base,
        margin: "2px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#171A1FFF",
      }),
      multiValueRemove: (base, state) => ({
        ...base,
        ...(state.isDisabled
          ? {
              visibility: "hidden",
              width: "4px",
            }
          : {}),
      }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: "0px",
        display: hideIndicator ? "none" : undefined,
        height: "20px",
      }),
    };

    const AvatarLabel = styled(Box)(() => ({
      display: "flex",
      alignItems: "center",
      ".email": {
        fontSize: "14px",
      },
    }));

    const handleFormatOptionLabel = (data) => {
      if (avatarLabel) {
        return (
          <Box>
            {data && (
              <AvatarLabel>
                <Box className="label">
                  <Box>
                    {data?.label && (
                      <EllipsisText
                        text={data?.label}
                        length="20"
                        tooltip={data?.label}
                      />
                    )}
                  </Box>
                  <Box className="email">
                    {data?.email && (
                      <EllipsisText
                        text={data?.email}
                        length="20"
                        tooltip={data?.email}
                      />
                    )}
                  </Box>
                </Box>
              </AvatarLabel>
            )}
          </Box>
        );
      }
      return data.label;
    };
    return (
      <Box width="100%">
        {label && (
          <Box class="font-sans font-bold text-sm leading-5 text-blue-900">
            {label}
          </Box>
        )}
        <ReactSelect
          data-testid="dropDown-input"
          options={filteredOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          // onInputChange={(inputValue) => changeState(inputValue.t)}
          value={value}
          // menuIsOpen={true}
          {...props}
          isMulti={isMulti}
          controlShouldRenderValue={controlShouldRenderValue}
          styles={customStyles}
          placeholder={placeholder}
          onChange={changeState}
          cacheUniqs={cacheUniqs}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isDisabled={isDisabled}
          components={components}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          hideSelectedOptions={hideSelectedOptions}
          defaultValue={defaultValue}
          formatOptionLabel={(data) => handleFormatOptionLabel(data)}
          loadOptions={loadOptions}
          cacheOptions={cacheOptions}
          defaultOptions={defaultOptions}
          backspaceRemovesValue={backspaceRemovesValue}
          debounceTimeout={debounceTimeout}
          additional={additional}
          menuHeight={menuHeight}
          menuPlacement={menuPlacement}
          menuPortalTarget={menuPortalTarget}
          closeMenuOnScroll={closeMenuOnScroll}
          menuShouldBlockScroll={menuShouldBlockScroll}
        />
        {error && helperText && (
          <FormHelperText class="h-0 font-sans font-normal text-xs leading-4 tracking-tight text-left mt-3">
            <Typography variant="body2 Danger">{helperText}</Typography>
          </FormHelperText>
        )}
      </Box>
    );
  }
);

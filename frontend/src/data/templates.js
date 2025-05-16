// Template rendering functions for the email signature generator
// Each template function takes the same props and returns JSX to render the signature

const templates = {
  // PROFESSIONAL TEMPLATES
  
  classic: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', color: colors.text }}>
        <tbody>
          <tr>
            {(logo || headshot) && (
              <td style={{ verticalAlign: 'top', paddingRight: '15px' }}>
                {logo && (
                  <img src={logo} alt="Company logo" style={{ maxWidth: '100px', maxHeight: '100px', display: 'block', marginBottom: '5px' }} />
                )}
                {headshot && (
                  <img src={headshot.url} alt="Headshot" style={{ 
                    maxWidth: '100px', 
                    maxHeight: '100px',
                    borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                    border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                      ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                      : 'none',
                    boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                             : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                             : 'none',
                  }} />
                )}
              </td>
            )}
            <td style={{ verticalAlign: 'top' }}>
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: '5px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>{formData.name}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '5px' }}>
                      <div style={{ fontSize: '14px', color: colors.secondary }}>{formData.title} | {formData.company}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div style={{ fontSize: '12px' }}>
                        <span style={{ display: 'block', marginBottom: '2px' }}>
                          📧 <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                        </span>
                        <span style={{ display: 'block', marginBottom: '2px' }}>
                          📱 {formData.phone}
                        </span>
                        {formData.website && (
                          <span style={{ display: 'block', marginBottom: '2px' }}>
                            🌐 <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                          </span>
                        )}
                        {formData.address && (
                          <span style={{ display: 'block', marginBottom: '2px' }}>
                            📍 {formData.address}
                          </span>
                        )}
                        {formData.extraFields && formData.extraFields.map((field, index) => (
                          field.value && (
                            <span key={index} style={{ display: 'block', marginBottom: '2px' }}>
                              {field.icon} {field.isLink ? (
                                <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                                   style={{ color: colors.primary, textDecoration: 'none' }}>
                                  {field.value}
                                </a>
                              ) : field.value}
                            </span>
                          )
                        ))}
                      </div>
                    </td>
                  </tr>
                  {activeLinks.length > 0 && (
                    <tr>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {activeLinks.map((link, index) => (
                            <a 
                              key={index} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <img 
                                src={getSocialIcon(link.name)} 
                                alt={link.name} 
                                style={{ 
                                  width: '20px', 
                                  height: '20px',
                                  filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                                }} 
                                className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                              />
                            </a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  
  modern: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', color: colors.text, width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ textAlign: 'center', paddingBottom: '15px' }}>
              {logo && (
                <img src={logo} alt="Company logo" style={{ maxWidth: '120px', maxHeight: '60px', marginBottom: '10px' }} />
              )}
              {headshot && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <img src={headshot.url} alt="Headshot" style={{ 
                    width: '80px', 
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                    border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                      ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                      : 'none',
                    boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                             : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                             : 'none',
                  }} />
                </div>
              )}
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: colors.primary, letterSpacing: '1px' }}>{formData.name}</div>
              <div style={{ fontSize: '14px', color: colors.secondary, marginTop: '5px' }}>{formData.title} | {formData.company}</div>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '10px 20px', 
                borderTop: `1px solid ${colors.secondary}`,
                borderBottom: `1px solid ${colors.secondary}`,
                fontSize: '12px'
              }}>
                <span style={{ display: 'inline-block', margin: '0 10px' }}>
                  <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                </span>
                <span style={{ display: 'inline-block', margin: '0 10px' }}>{formData.phone}</span>
                {formData.website && (
                  <span style={{ display: 'inline-block', margin: '0 10px' }}>
                    <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                  </span>
                )}
                {formData.extraFields && formData.extraFields.map((field, index) => (
                  field.value && (
                    <span key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                      {field.isLink ? (
                        <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                          style={{ color: colors.primary, textDecoration: 'none' }}>
                          {field.value}
                        </a>
                      ) : field.value}
                    </span>
                  )
                ))}
              </div>
            </td>
          </tr>
          {activeLinks.length > 0 && (
            <tr>
              <td style={{ textAlign: 'center', paddingTop: '15px' }}>
                {activeLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', margin: '0 5px' }}
                  >
                    <img 
                      src={getSocialIcon(link.name)} 
                      alt={link.name} 
                      style={{ 
                        width: '22px', 
                        height: '22px',
                        filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                      }} 
                      className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                    />
                  </a>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  },
  
  compact: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', color: colors.text, maxWidth: '400px' }}>
        <tbody>
          <tr>
            {(logo || headshot) && (
              <td style={{ paddingRight: '15px', verticalAlign: 'middle' }}>
                {logo && (
                  <img src={logo} alt="Company logo" style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '4px' }} />
                )}
                {headshot && !logo && (
                  <img src={headshot.url} alt="Headshot" style={{ 
                    width: '60px', 
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                    border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                      ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                      : 'none',
                    boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                             : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                             : 'none',
                  }} />
                )}
              </td>
            )}
            <td style={{ borderLeft: `2px solid ${colors.primary}`, paddingLeft: '15px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.primary }}>{formData.name}</div>
              <div style={{ fontSize: '12px', color: colors.secondary, marginBottom: '5px' }}>{formData.title} | {formData.company}</div>
              <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                <div>
                  <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                  {" • "}
                  {formData.phone}
                </div>
                {(formData.website || formData.extraFields?.some(f => f.value) || activeLinks.length > 0) && (
                  <div style={{ marginTop: '3px' }}>
                    {formData.website && (
                      <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none', marginRight: '10px' }}>{formData.website}</a>
                    )}
                    {formData.extraFields && formData.extraFields.map((field, index) => (
                      field.value && (
                        <span key={index} style={{ marginRight: '10px' }}>
                          {field.isLink ? (
                            <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                              style={{ color: colors.primary, textDecoration: 'none' }}>
                              {field.value}
                            </a>
                          ) : field.value}
                        </span>
                      )
                    ))}
                    {activeLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', marginRight: '5px' }}
                      >
                        <img 
                          src={getSocialIcon(link.name)} 
                          alt={link.name} 
                          style={{ 
                            width: '14px', 
                            height: '14px',
                            filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                          }} 
                          className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  
  bold: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', color: colors.text, maxWidth: '500px' }}>
        <div style={{ 
          backgroundColor: colors.primary, 
          padding: '15px', 
          borderRadius: '4px 4px 0 0' 
        }}>
          <div style={{ 
            color: '#ffffff', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{formData.name}</span>
            {logo && (
              <img src={logo} alt="Company logo" style={{ maxHeight: '40px', maxWidth: '100px' }} />
            )}
            {headshot && !logo && (
              <img src={headshot.url} alt="Headshot" style={{ 
                width: '40px', 
                height: '40px',
                objectFit: 'cover',
                borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                border: headshot.borderStyle !== 'none' ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} #ffffff` : 'none',
              }} />
            )}
          </div>
        </div>
        <div style={{ padding: '15px', border: `1px solid ${colors.primary}`, borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: colors.secondary, marginBottom: '10px' }}>
            {formData.title} | {formData.company}
          </div>
          <table cellPadding="0" cellSpacing="0" style={{ fontSize: '12px', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', paddingBottom: '5px' }}>
                  <strong>Email: </strong>
                  <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                </td>
                <td style={{ width: '50%', paddingBottom: '5px' }}>
                  <strong>Phone: </strong>{formData.phone}
                </td>
              </tr>
              {(formData.website || formData.address) && (
                <tr>
                  {formData.website && (
                    <td style={{ paddingBottom: '5px' }}>
                      <strong>Web: </strong>
                      <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                    </td>
                  )}
                  {formData.address && (
                    <td style={{ paddingBottom: '5px' }}>
                      <strong>Address: </strong>{formData.address}
                    </td>
                  )}
                </tr>
              )}
              {formData.extraFields && formData.extraFields.some(f => f.value) && (
                <tr>
                  {formData.extraFields.filter(f => f.value).slice(0, 2).map((field, index) => (
                    <td key={index} style={{ paddingBottom: '5px' }}>
                      <strong>{field.label}: </strong>
                      {field.isLink ? (
                        <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                          style={{ color: colors.primary, textDecoration: 'none' }}>
                          {field.value}
                        </a>
                      ) : field.value}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
          {activeLinks.length > 0 && (
            <div style={{ 
              marginTop: '10px', 
              borderTop: `1px solid ${colors.secondary}`, 
              paddingTop: '10px',
              display: 'flex',
              gap: '10px' 
            }}>
              {activeLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <img 
                    src={getSocialIcon(link.name)} 
                    alt={link.name} 
                    style={{ 
                      width: '22px', 
                      height: '22px',
                      filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                    }} 
                    className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
  
  // Additional Professional Templates
  
  executive: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Georgia, serif', color: colors.text, borderCollapse: 'collapse', width: '500px' }}>
        <tbody>
          <tr>
            <td colSpan="2" style={{ borderBottom: `2px solid ${colors.primary}`, paddingBottom: '10px' }}>
              <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <div style={{ fontSize: '24px', fontWeight: 'normal', color: colors.primary, letterSpacing: '1px' }}>{formData.name}</div>
                      <div style={{ fontSize: '14px', fontStyle: 'italic', color: colors.secondary, marginTop: '2px' }}>{formData.title} | {formData.company}</div>
                    </td>
                    {(logo || headshot) && (
                      <td style={{ textAlign: 'right' }}>
                        {logo && (
                          <img src={logo} alt="Company logo" style={{ maxHeight: '50px', maxWidth: '120px' }} />
                        )}
                        {headshot && !logo && (
                          <img src={headshot.url} alt="Headshot" style={{ 
                            width: '60px', 
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                            border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                              ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                              : 'none',
                            boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                                    : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                                    : 'none',
                          }} />
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: '10px', paddingRight: '20px', width: '60%', verticalAlign: 'top' }}>
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: '5px' }}>
                      <span style={{ fontSize: '12px' }}>
                        <span style={{ color: colors.secondary }}>Email: </span>
                        <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '5px' }}>
                      <span style={{ fontSize: '12px' }}>
                        <span style={{ color: colors.secondary }}>Phone: </span>{formData.phone}
                      </span>
                    </td>
                  </tr>
                  {formData.website && (
                    <tr>
                      <td style={{ paddingBottom: '5px' }}>
                        <span style={{ fontSize: '12px' }}>
                          <span style={{ color: colors.secondary }}>Website: </span>
                          <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                        </span>
                      </td>
                    </tr>
                  )}
                  {formData.extraFields && formData.extraFields.map((field, index) => (
                    field.value && (
                      <tr key={index}>
                        <td style={{ paddingBottom: '5px' }}>
                          <span style={{ fontSize: '12px' }}>
                            <span style={{ color: colors.secondary }}>{field.label}: </span>
                            {field.isLink ? (
                              <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                                style={{ color: colors.primary, textDecoration: 'none' }}>
                                {field.value}
                              </a>
                            ) : field.value}
                          </span>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </td>
            <td style={{ paddingTop: '10px', borderLeft: `1px solid ${colors.secondary}`, paddingLeft: '20px', verticalAlign: 'top' }}>
              {formData.address && (
                <div style={{ fontSize: '12px', marginBottom: '10px' }}>
                  <div style={{ color: colors.secondary, marginBottom: '3px' }}>Address:</div>
                  <div style={{ lineHeight: '1.4' }}>{formData.address}</div>
                </div>
              )}
              {activeLinks.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', color: colors.secondary, marginBottom: '5px' }}>Connect:</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {activeLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <img 
                          src={getSocialIcon(link.name)} 
                          alt={link.name} 
                          style={{ 
                            width: '18px', 
                            height: '18px',
                            filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                          }} 
                          className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  
  minimal: (props) => {
    const { formData, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', color: colors.text, maxWidth: '400px' }}>
        <tbody>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: colors.primary }}>{formData.name}</span>
              <span style={{ fontSize: '14px', color: colors.text, marginLeft: '8px' }}>• {formData.title}</span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '5px', fontSize: '12px' }}>
              <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
              <span style={{ margin: '0 8px', color: colors.secondary }}>•</span>
              <span>{formData.phone}</span>
              {formData.website && (
                <>
                  <span style={{ margin: '0 8px', color: colors.secondary }}>•</span>
                  <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                </>
              )}
            </td>
          </tr>
          {activeLinks.length > 0 && (
            <tr>
              <td style={{ paddingTop: '5px' }}>
                {activeLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', marginRight: '8px' }}
                  >
                    <img 
                      src={getSocialIcon(link.name)} 
                      alt={link.name} 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                      }} 
                      className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                    />
                  </a>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  },
  
  // CREATIVE TEMPLATES
  
  creative1: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <div style={{ 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        maxWidth: '500px',
        border: 'none',
        borderLeft: `4px solid ${colors.primary}`,
        padding: '15px',
        backgroundColor: '#f8f9fa'
      }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'top' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '5px' }}>{formData.name}</div>
                <div style={{ fontSize: '14px', color: colors.secondary, marginBottom: '15px', fontWeight: '500' }}>
                  {formData.title} <span style={{ color: '#adb5bd' }}>@</span> {formData.company}
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
                  <div style={{ 
                    backgroundColor: colors.primary, 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px',
                    marginRight: '8px',
                    marginBottom: '5px'
                  }}>
                    <a href={`mailto:${formData.email}`} style={{ color: 'white', textDecoration: 'none' }}>{formData.email}</a>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: colors.secondary, 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px',
                    marginRight: '8px',
                    marginBottom: '5px'
                  }}>
                    {formData.phone}
                  </div>
                  
                  {formData.website && (
                    <div style={{ 
                      backgroundColor: colors.primary, 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px',
                      marginRight: '8px',
                      marginBottom: '5px'
                    }}>
                      <a href={`https://${formData.website}`} style={{ color: 'white', textDecoration: 'none' }}>{formData.website}</a>
                    </div>
                  )}
                  
                  {formData.extraFields && formData.extraFields.map((field, index) => (
                    field.value && (
                      <div key={index} style={{ 
                        backgroundColor: index % 2 === 0 ? colors.primary : colors.secondary, 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px',
                        marginRight: '8px',
                        marginBottom: '5px'
                      }}>
                        {field.isLink ? (
                          <a href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                             style={{ color: 'white', textDecoration: 'none' }}>
                            {field.value}
                          </a>
                        ) : field.value}
                      </div>
                    )
                  ))}
                </div>
                
                {activeLinks.length > 0 && (
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {activeLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          textDecoration: 'none',
                          backgroundColor: '#f1f3f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%'
                        }}
                      >
                        <img 
                          src={getSocialIcon(link.name)} 
                          alt={link.name} 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                          }} 
                          className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </td>
              
              {(logo || headshot) && (
                <td style={{ verticalAlign: 'top', textAlign: 'right', width: '100px' }}>
                  {logo && (
                    <img src={logo} alt="Company logo" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                  )}
                  {headshot && !logo && (
                    <img src={headshot.url} alt="Headshot" style={{ 
                      width: '80px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                      border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                        ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                        : 'none',
                      boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                              : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                              : 'none',
                    }} />
                  )}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  
  creative2: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <div style={{ 
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        maxWidth: '500px',
        background: `linear-gradient(135deg, ${colors.primary}30 0%, ${colors.secondary}20 100%)`,
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
          <tbody>
            <tr>
              {(logo || headshot) && (
                <td style={{ verticalAlign: 'middle', paddingRight: '20px', width: '100px' }}>
                  {logo && (
                    <img src={logo} alt="Company logo" style={{ 
                      maxWidth: '80px', 
                      maxHeight: '80px',
                      borderRadius: '8px',
                      background: 'white',
                      padding: '5px'
                    }} />
                  )}
                  {headshot && !logo && (
                    <div style={{ 
                      width: '80px',
                      height: '80px',
                      borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                      overflow: 'hidden',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                        ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                        : 'none',
                    }}>
                      <img 
                        src={headshot.url} 
                        alt="Headshot" 
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }} 
                      />
                    </div>
                  )}
                </td>
              )}
              <td style={{ verticalAlign: 'middle' }}>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: colors.primary, letterSpacing: '0.5px' }}>
                  {formData.name}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: colors.secondary, 
                  marginTop: '4px', 
                  marginBottom: '15px',
                  letterSpacing: '0.5px',
                  fontWeight: '500'
                }}>
                  {formData.title} | {formData.company}
                </div>
                
                <table cellPadding="0" cellSpacing="0" style={{ marginBottom: '15px' }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '15px', paddingBottom: '5px' }}>
                        <a 
                          href={`mailto:${formData.email}`} 
                          style={{ 
                            textDecoration: 'none', 
                            color: colors.primary,
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ 
                            display: 'inline-block', 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: colors.primary,
                            marginRight: '5px'
                          }}></span>
                          {formData.email}
                        </a>
                      </td>
                      <td style={{ paddingBottom: '5px' }}>
                        <span 
                          style={{ 
                            color: colors.text,
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ 
                            display: 'inline-block', 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: colors.secondary,
                            marginRight: '5px'
                          }}></span>
                          {formData.phone}
                        </span>
                      </td>
                    </tr>
                    {(formData.website || (formData.extraFields && formData.extraFields.length > 0)) && (
                      <tr>
                        {formData.website && (
                          <td style={{ paddingRight: '15px', paddingBottom: '5px' }}>
                            <a 
                              href={`https://${formData.website}`} 
                              style={{ 
                                textDecoration: 'none', 
                                color: colors.primary,
                                fontSize: '12px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <span style={{ 
                                display: 'inline-block', 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                backgroundColor: colors.primary,
                                marginRight: '5px'
                              }}></span>
                              {formData.website}
                            </a>
                          </td>
                        )}
                        {formData.extraFields && formData.extraFields[0] && formData.extraFields[0].value && (
                          <td style={{ paddingBottom: '5px' }}>
                            {formData.extraFields[0].isLink ? (
                              <a 
                                href={formData.extraFields[0].value.startsWith('http') ? formData.extraFields[0].value : `https://${formData.extraFields[0].value}`} 
                                style={{ 
                                  textDecoration: 'none', 
                                  color: colors.primary,
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <span style={{ 
                                  display: 'inline-block', 
                                  width: '8px', 
                                  height: '8px', 
                                  borderRadius: '50%', 
                                  backgroundColor: colors.primary,
                                  marginRight: '5px'
                                }}></span>
                                {formData.extraFields[0].value}
                              </a>
                            ) : (
                              <span 
                                style={{ 
                                  color: colors.text,
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <span style={{ 
                                  display: 'inline-block', 
                                  width: '8px', 
                                  height: '8px', 
                                  borderRadius: '50%', 
                                  backgroundColor: colors.secondary,
                                  marginRight: '5px'
                                }}></span>
                                {formData.extraFields[0].value}
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {activeLinks.length > 0 && (
                  <div>
                    {activeLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          textDecoration: 'none', 
                          marginRight: '10px',
                          display: 'inline-block'
                        }}
                      >
                        <img 
                          src={getSocialIcon(link.name)} 
                          alt={link.name} 
                          style={{ 
                            width: '20px', 
                            height: '20px',
                            filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                          }} 
                          className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  
  artistic: (props) => {
    const { formData, logo, headshot, colors, activeLinks, getSocialIcon, iconAnimation } = props;
    
    return (
      <div style={{ 
        fontFamily: '"Playfair Display", serif',
        maxWidth: '500px',
        padding: '25px',
        background: `linear-gradient(45deg, ${colors.primary}0A, ${colors.secondary}0A)`,
        border: `1px solid ${colors.primary}30`,
        borderRadius: '5px'
      }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: `1px solid ${colors.primary}30` }}>
                {logo && (
                  <img src={logo} alt="Company logo" style={{ maxHeight: '60px', marginBottom: '15px' }} />
                )}
                {headshot && !logo && (
                  <div style={{ marginBottom: '15px', display: 'inline-block' }}>
                    <img src={headshot.url} alt="Headshot" style={{ 
                      width: '80px', 
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: headshot.shape === 'circle' ? '50%' : headshot.shape === 'rounded' ? '8px' : '0',
                      border: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' 
                        ? `2px ${headshot.borderStyle === 'dashed' ? 'dashed' : 'solid'} ${headshot.borderColor}` 
                        : 'none',
                      boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                              : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                              : 'none',
                    }} />
                  </div>
                )}
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '400', 
                  color: colors.primary,
                  letterSpacing: '1px',
                  fontFamily: '"Playfair Display", serif',
                }}>
                  {formData.name}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: colors.secondary,
                  marginTop: '5px',
                  fontStyle: 'italic',
                  letterSpacing: '1px'
                }}>
                  {formData.title} · {formData.company}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: '20px', textAlign: 'center' }}>
                <div style={{ 
                  display: 'inline-block', 
                  margin: '0 auto', 
                  textAlign: 'center',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: colors.text
                }}>
                  <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                  <span style={{ margin: '0 10px', color: colors.secondary }}>•</span>
                  {formData.phone}
                  {formData.website && (
                    <>
                      <span style={{ margin: '0 10px', color: colors.secondary }}>•</span>
                      <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                    </>
                  )}
                  {formData.extraFields && formData.extraFields.map((field, index) => (
                    field.value && (
                      <>
                        <span style={{ margin: '0 10px', color: colors.secondary }}>•</span>
                        {field.isLink ? (
                          <a 
                            href={field.value.startsWith('http') ? field.value : `https://${field.value}`} 
                            style={{ color: colors.primary, textDecoration: 'none' }}
                          >
                            {field.value}
                          </a>
                        ) : field.value}
                      </>
                    )
                  ))}
                </div>
                
                {activeLinks.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    {activeLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          textDecoration: 'none',
                          margin: '0 8px'
                        }}
                      >
                        <img 
                          src={getSocialIcon(link.name)} 
                          alt={link.name} 
                          style={{ 
                            width: '20px', 
                            height: '20px',
                            filter: props.iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                          }} 
                          className={iconAnimation !== 'none' ? `icon-${iconAnimation}` : ''}
                        />
                      </a>
                    ))}
                  </div>
                )}
                
                {formData.address && (
                  <div style={{ 
                    fontSize: '11px', 
                    color: colors.secondary,
                    marginTop: '15px',
                    fontStyle: 'italic'
                  }}>
                    {formData.address}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  
  // Template fallback
  default: (props) => templates.classic(props)
};

export default templates;
